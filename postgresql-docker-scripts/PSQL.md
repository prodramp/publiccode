# SQL Scripts #

### Create Table:

CREATE TABLE if not exists Customers(CustomerID serial PRIMARY KEY, CustomerEmail VARCHAR ( 255 ) UNIQUE NOT NULL, LastName varchar(255) UNIQUE NOT NULL, FirstName varchar(255) NOT NULL, Address varchar(255) NOT NULL, City varchar(255) NOT NULL, State varchar(255) NOT NULL, Zipcode varchar(255) NOT NULL, CreatedOn TIMESTAMP NOT NULL);


### Insert Record:
INSERT INTO Customers (CustomerEmail, LastName, FirstName, Address, City, State, Zipcode, CreatedOn) VALUES ('tomberichsen@testmail12345.com', 'Erichsen', 'Tom B.', '122 First Street, Apt 1', 'San Mateo', 'CA', '94001', '07/29/2022');

Note: 
- Above script will protect duplicate email
- Customer Id is serial and not needed with INSERT command

## Delete Record:

Delete from Customers where CustomerEmail = 'tomberichsen@testmail12345.com';

