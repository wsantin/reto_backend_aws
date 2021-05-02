# Demo - Microservicio - Gestionar Usuarios

Microservicio para Gestionar usuarios con información básica con DynamoDB y consultar Api externa StartWards

## Requisito
---
Se requiere que tenga instalado Node js >12: https://nodejs.org/en/download/
Se requiere que tenga configurado Aws en su local: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
Se requiere tener DynamoDb en Local: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
Se requiere tener instalado Java SDK
Se requiere tener cuenta de Severless Framework

## PASO 1
---
### Instalacion de Serverless y configuracion
Se requiere tener instalado npm
```
npm install serverless -g
```

Crear app Serverless
```
APP: app-nodejs
SERVICE: backend-users
```

Modificar el archivo: serverless
```
org: kattyhidalgo => org: {}
```

Crear Providers que conecte con Amazon
```
Nombre: aws
```

## PASO 2
---
### DynamoDB en Local
Activar dynamodb con el puerto como default el 8500
```
Consola: java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8500
```

Crear una tabla 
```
Consola: aws dynamodb create-table --attribute-definitions AttributeName=id,AttributeType=S --table-name demo --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --region ap-southeast-2  --endpoint-url http://localhost:8500 --output json
```

## PASO 3
---
### Ejecución y deploy local
Instalar Dependencias
```
Consola: npm install
```

Modificar Environment
```
.env.example a .env
```

Ejecutar Serverless Local
```
npm run dev
```

Ejecutar Test Serverless Local
```
npm run test
```

## Deploy Serverless
Ejecutar Test Serverless Local
```
npm run deploy
```