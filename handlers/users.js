'use strict';

const { v4: uuidv4 } = require('uuid');

import response from '../utils/response'
import sortByDate from '../utils/page'

//Environment
import clientDynamoDb from '../services/dynamodb'

const DYNAMODB_TABLE =  String(process.env.AWS_DYNAMODB_TABLE);

//Registrar Usuarios en DynamoDb
export const postUser = async (event, context, callback) => {
  try {
    const reqBody = JSON.parse(event.body);
    
    const data = {
      TableName: DYNAMODB_TABLE,
      Item: {
        id: String(uuidv4()),
        last_name: reqBody.last_name,
        first_name: reqBody.first_name,
        phone: reqBody.phone,
        email: reqBody.email,
        createdAt: new Date().toISOString(),
      },
    }

    await clientDynamoDb.put(data).promise();
    return callback(null, response(201, {
      status:'ok',
      message:'Ha sido registrado correctamente'
    }));

  } catch (error) {
    return callback(null, response(500, {
      status:'error',
      error: "Presentamos algunos problemas al registrar al usuario."
    }))
  }
};

//Obtener todos los usuarios DynamoDb
export const getUsersAll = async (event, context, callback) => {
  try {

    let result = await clientDynamoDb.scan({TableName: DYNAMODB_TABLE}).promise();
    if(!result.Items)
      return callback(null, response(500, {
        status:'error',
        error: "No existe usuario"
      }))

    return callback(null, response(200, {
      status:'ok',
      message:'Se ha listado los datos correctamente',
      datas: result.Items.sort(sortByDate)
    }));
  } catch (error) {
    return callback(null, response(500, {
      status:'error',
      error: "Presentamos algunos problemas al encontrar los usuarios."
    }))
  }
}

//Obtener la informacion de un usuario en DynamoDb
export const getUser = async (event, context, callback) => {
  try{

    const id = event.pathParameters.user_id;

    const params = {
      Key: {
        id: id
      },
      TableName: DYNAMODB_TABLE
    };
    let result = await clientDynamoDb.get(params).promise();
    if(!result.Item)
      return callback(null, response(500, {
        status:'error',
        error: "No existe Usuario."
      }))

    return callback(null, response(200, {
      status:'ok',
      message:'Se ha listado el usuario correctamente',
      data: result.Item
    }))

  } catch (error) {
    return callback(null, response(500, {
      status:'error',
      error: "Presentamos algunos problemas al encontrar los usuarios."
    }))
  }
};

//Modificar la informacion de un usuario en DynamoDb
export const updateUser = async (event, context, callback) => {
  try {

    const id = event.pathParameters.user_id;
    const reqBody = JSON.parse(event.body);

    const paramsVerifyId = {
      Key: {
        id: id
      },
      TableName: DYNAMODB_TABLE
    };

    const result = await clientDynamoDb.get(paramsVerifyId).promise();
    if(!result.Item)
      return callback(null, response(500, {
        status:'error',
        error: "No existe usuario"
    }))
    
    const params = {
      TableName: DYNAMODB_TABLE,
      Key: {
        id: id
      },
      UpdateExpression: "SET last_name = :last_name, firs_name = :first_name, phone = :phone, description = :description",
      ExpressionAttributeValues: {
        ":last_name": reqBody.last_name || null,
        ":first_name": reqBody.first_name || null,
        ":phone": reqBody.phone || null,
        ":description": reqBody.firs_name || null,
  
      },
      ReturnValues: "ALL_NEW"
    };
        
    const resultUpdate = await clientDynamoDb.update(params).promise();
    return callback(null, response(200, {
      status:'ok',
      message:'Se a modificado correctamente el usuario',
      // data: resultUpdate.Item
    }))
    

  } catch (error) {
    return callback(null, response(500, {
      status:'error',
      error: "Presentamos algunos problemas al encontrar los usuarios."
    }))
  }
};

//Eliminar la informacion de un usuario en DynamoDb
export const deleteUser = async (event, context, callback) => {
  try {
    const id = event.pathParameters.user_id;

    const params = {
      Key: {
        id: id
      },
      TableName: DYNAMODB_TABLE
    };
    let result = await clientDynamoDb.delete(params).promise();
    if(result.ConsumedCapacity)
      return callback(null, response(500, {
        status:'error',
        error: "No existe usuario"
      }))

    return callback(null, response(200, {
      status:'ok',
      message:'Se ah eliminado correctamente el usuario',
      data: result.Item
    }))

  } catch (error) {
    return callback(null, response(500, {
      status:'error',
      error: "Presentamos algunos problemas al encontrar los usuarios."
    }))
  }
};
