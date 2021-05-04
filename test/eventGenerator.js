const APIGatewayRequest = ({
    body,
    method,
    path = '',
    queryStringParameters,
    pathParameters,
    stageVariables = null,
}) => {
    const request = {
        body: body ? JSON.stringify(body) : null,
        headers: {},
        multiValueHeaders: {},
        httpMethod: method,
        isBase64Encoded: false,
        path,
        pathParameters: pathParameters || null,
        queryStringParameters: queryStringParameters || null,
        multiValueQueryStringParameters: null,
        stageVariables,
        requestContext: {
            accountId: '',
            apiId: '',
            httpMethod: method,
            identity: {
                accessKey: '',
                accountId: '',
                apiKey: '',
                apiKeyId: '',
                caller: '',
                cognitoAuthenticationProvider: '',
                cognitoAuthenticationType: '',
                cognitoIdentityId: '',
                cognitoIdentityPoolId: '',
                principalOrgId: '',
                sourceIp: '',
                user: '',
                userAgent: '',
                userArn: '',
            },
            path,
            stage: '',
            requestId: '',
            requestTimeEpoch: 3,
            resourceId: '',
            resourcePath: '',
        },
        resource: '',
    };
    return request;
};

export default APIGatewayRequest