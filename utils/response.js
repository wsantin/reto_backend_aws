const response = (statusCode, message) =>{
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
};

export default response;
