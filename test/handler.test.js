import * as handlerIndex from '../handler';
import * as handlerUser from '../handlers/users';
import * as handlerStartWards from '../handlers/startwards';
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4()

test('index', async () => {
  const event = 'event';
  const context = {};
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    // expect(typeof response.body).toBe("string");
  };

  await handlerIndex.index(event, context, callback);
});

test('postUser', async () => {
  const event = {
    body: {
      id: uuid,
      last_name: "test_"+Math.random().toString(36).substring(3),
      first_name: "test_"+Math.random().toString(36).substring(3),
      phone: "+51918558986",
      email: "hugo.93wal@gmail.com"
    }
  };
  console.log("-----------------A")
  console.log("1: ",JSON.parse(event))
  console.log("1: ",JSON.stringify(event))
  console.log("-----------------FIN")
  const context = {};
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(201);
    // expect(typeof response.body).toBe("string");
  };

  await handlerUser.postUser(event, context, callback);
});

test('getUsersAll', async () => {
  const event = 'event';
  const context = {};
  const callback = (error, response) => {
    console.log("getUsersAll: ",response.data)
    expect(response.statusCode).toEqual(200);
    // expect(typeof response.body).toBe("string");
  };

  await handlerUser.getUsersAll(event, context, callback);
});


test('getUser', async () => {
  const event = {
    pathParameters:{
      user_id: uuid
    }
  };

  const context = {};
  const callback = (error, response) => {
    console.log("getUser: ",response.data)
    expect(response.statusCode).toEqual(200);
    // expect(typeof response.body).toBe("string");
  };

  await handlerUser.getUser(event, context, callback);
});

test('updateUser', async () => {
  const event = {
    pathParameters: uuid,
    body: {
      "id": uuid,
      "last_name": "test_"+Math.random().toString(36).substring(3),
      "first_name": "test_"+Math.random().toString(36).substring(3),
      "phone": "+51918558986",
      "email": "hugo.93wal@gmail.com"
    }
  };

  const context = {};
  const callback = (error, response) => {
    console.log("updateUser: ",response.data)
    expect(response.statusCode).toEqual(200);
    // expect(typeof response.body).toBe("string");
  };

  await handlerUser.updateUser(event, context, callback);
});

test('deleteUser', async () => {
  const event = {
    pathParameters: {
      user_id: uuid
    }
  };
  const context = {};
  const callback = (error, response) => {
    console.log("deleteUser: ",response.data)
    expect(response.statusCode).toEqual(200);
    // expect(typeof response.body).toBe("string");
  };

  await handlerUser.deleteUser(event, context, callback);
});

test('getStartWardsPersons', async () => {

  const event={
    "pathParameters":{"person_id":"1"}
  }

  const context = {};
  const callback = (error, response) => {
    console.log("getStartWardsPersons: ",response)
    expect(response.statusCode).toEqual(200);
    // expect(typeof response.body).toBe("string");
  };

  await handlerStartWards.getStartWardsPersons(event, context, callback);
});
