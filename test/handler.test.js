import * as handlerIndex from '../handler';
import * as handlerUser from '../handlers/users';
import * as handlerStartWards from '../handlers/startwards';
import eventGenerator from './eventGenerator';

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

  jest.setTimeout(10000);

  const event = eventGenerator({
    body: {
      id: uuid,
      last_name: "test_"+Math.random().toString(36).substring(3),
      first_name: "test_"+Math.random().toString(36).substring(3),
      phone: "+51918558986",
      email: "hugo.93wal@gmail.com"
    },
    method: "post"
  });

  const context = {};
  
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(201);
    // expect(typeof response.body).toBe("string");
  };

  await handlerUser.postUser(event, context, callback);
});

test('getUsersAll', async () => {
  const event = {};
  const context = {};
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
  };

  await handlerUser.getUsersAll(event, context, callback);
});


test('getUser', async () => {
  jest.setTimeout(10000);

  const event = eventGenerator({
    pathParameters: {
      user_id: uuid
    },
    method: "get"
  });

  const context = {};
  const callback = (error, response) => {
    expect(response.git).toEqual(200);
    // expect(typeof response.body).toBe("string");
  };

  await handlerUser.getUser(event, context, callback);
});

test('updateUser', async () => {

  jest.setTimeout(10000);

  const event = eventGenerator({
    pathParameters: {
      user_id: uuid,
    },
    body: {
      "id": uuid,
      "last_name": "test_"+Math.random().toString(36).substring(3),
      "first_name": "test_"+Math.random().toString(36).substring(3),
      "phone": "+51918558986",
      "email": "hugo.93wal@gmail.com"
    },
    method: "put"
  });

  const context = {};
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
  };

  await handlerUser.updateUser(event, context, callback);
});

test('deleteUser', async () => {
  jest.setTimeout(10000);
  const event = eventGenerator({
    pathParameters: {
      user_id: uuid,
    },
    method: "delete"
  });

  const context = {};
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
  };

  await handlerUser.deleteUser(event, context, callback);
});

test('getStartWardsPersons', async () => {

  const event = eventGenerator({
    pathParameters: {
      person_id: "1",
    },
    method: "get"
  });

  const context = {};
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    // expect(typeof response.body).toBe("string");
  };

  await handlerStartWards.getStartWardsPersons(event, context, callback);
});
