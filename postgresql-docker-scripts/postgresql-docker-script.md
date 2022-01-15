# Setting up postgresql with Docker #

## What you need ##
1. Docker DeskTop
```
$  docker -v
Docker version 20.10.8, build 3967b7d

$ docker-compose -v
docker-compose version 1.29.2, build 5becea4c
```

2. pgadmin4 
Install from here > https://www.pgadmin.org/download/

## Getting started ##
1. Create a new folder and create a new file name > docker-compose.yml

### Postgresql 12.x ###
```
version: '3.1' # specify docker-compose version
services:
  dockerpgdb:
    image: postgres
    ports:
      - "5432:5432"
    restart: always
    environment:
      POSTGRES_PASSWORD: Password
      POSTGRES_DB: dockerpgdb
      POSTGRES_USER: abcUser
    volumes:
      - ./data:/var/lib/postgresql%
```

### Postgresql 14.x ###
```
version: '3.9' # specify docker-compose version
services:
  pg14db:
    image: postgres:14-alpine
    ports:
      - "5439:5432"
    restart: always
    environment:
      POSTGRES_PASSWORD: Password
      POSTGRES_DB: pg14db
      POSTGRES_USER: abcUser
    volumes:
      - ./data:/var/lib/postgresql%
```

Note:
- Above we decided to use host port 5439 to bind with the container port 5432 based on asumption that host port 5432 is already used to run another version of postgres DB. So if we use 5432 port at host, it will generate port conflict error.
- So if you are not running any postgres DB at the host and port 5432 is open you can use port 5432:5432 instead of 5439:5432.


2. Run the following in the same folder where  
- $ docker-compose up
- Note: You will see some activity on command prompt and then in the Docker desktop application, your container will be running

3. Test with pgadmin4
- Run pgadmin4
- In the Web Browser please setup a new server as below:
```
host: localhost
port: 5432
maintenance database: postgres
username: abcUser
password: Password
```

4. Connect and test

Launch the docker container command line for postgresql
```
/# psql -V
psql (PostgreSQL) 14.1


/# psql -d pg14db -U abcUser
psql (14.1)
Type "help" for help.

pg14db=# 

pg14db=# select version();
                                                   version
--------------------------------------------------------------------------------------------------------------
 PostgreSQL 14.1 on x86_64-pc-linux-musl, compiled by gcc (Alpine 10.3.1_git20211027) 10.3.1 20211027, 64-bit
(1 row)

```

