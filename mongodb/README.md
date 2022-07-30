# Mongo DB - Various Flavors # 

## Pymongo install with Conda

- $ conda install -c anaconda pymongo
- $ conda list pymongo 
  - pymongo                   4.2.0                    pypi_0    pypi


## Docker : Docker Desktop, docker-compose.yml 

Readiness: Please install docker Desktop application to manage various docker containers in your machine. 

Step 1: Create a folder name mongodb312 and create a file name docker-compose.ymp and add the following content:

```
version: '3.12'

services:
  mongodb:
    container_name: mongodb
    image:
       mongo:latest    
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: Password
      MONGO_REPLICA_HOST: localhost
      MONGO_REPLICA_PORT: 27017
    ports:
      - '27017:27017'
    volumes:
      - "mongodb-data:/data/db"

volumes:
  mongodb-data: {}
```

Step 2: Run the following in the same folder where

$ docker-compose up

Note: You will see some activity on command prompt and then in the Docker desktop application, your container will be running


## Connector 
- Sync Connector - PyMongo
- Async Connector - Motor


## Test MongoDB Connection
Install MongoDB client/server community edition from MongoDB website based on your OS.

- $ mongosh
- $ mongosh "mongodb://localhost:27017"

