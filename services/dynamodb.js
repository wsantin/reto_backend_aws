import AWS from "aws-sdk";

const DYNAMODB_URL = String(process.env.AWS_DYNAMODB_URL);
const DYNAMODB_REGION = String(process.env.AWS_DYNAMODB_REGION);
const IS_OFFLINE = process.env.IS_OFFLINE;

let clientDynamoDb;
if (IS_OFFLINE === 'true') {
  clientDynamoDb = new AWS.DynamoDB.DocumentClient({
      region: DYNAMODB_REGION,
      endpoint: DYNAMODB_URL
    })
}
else{
  clientDynamoDb = new AWS.DynamoDB.DocumentClient({
    region: DYNAMODB_REGION
  });
};
export default clientDynamoDb