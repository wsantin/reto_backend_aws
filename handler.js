export const index = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status:'ok',
      message: `Demo Microservicios Node js - Usuarios, DynamoDb, ApiStarWards`,
    }),
  };
};