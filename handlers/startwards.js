import response from '../utils/response'
import modelPersonTraduction from '../models/startwardsTraduction'
import apiClient from '../api/axios'

//Obtener la informacion de un registro
export const getStartWardsPersons = async (event, context, callback) => {

  const id = event.pathParameters.person_id;
  const url_people = `/api/people/${id}/`;
  
  const result = await apiClient.get(url_people)
  if(result.status !== 200)
    return callback(null, response(500, {
      status:'error: ',
      error: "Presentamos algunos problemas para mostrar la persona de startwards."
    }))

  const new_data= await modelPersonTraduction(result.data);
  return response(200, {
    status:'ok',
    message:'Se listo correctamente los datos de la persona',
    data: new_data
  });
};
