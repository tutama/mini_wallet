
## Running NodeJS Mini-Wallet
## ##########################

## Pre-requisites
Install Node.js version v14.18.0
Install MySQL Server in localhost
Install Database Management Tool, such as MySQL Workbench, Navicat, DBeaver, etc.


## Getting started

Clone the repository
git clone  <git lab template url> <project_name>

OR

Clone the repository using github web or sourcetree


Setup Database
Open database management tool, import dumped SQL data and definition in
cd <project_name>/db_dump


Install dependencies for Node JS project
cd <project_name>
npm install


Setup .env
Given _env.example file, please rename it as .env file and set the values of the followings
1. TOKEN_SECRET, needed to generate JSON Web Token (JWT)
2. DB_HOST, where mysql server is located
3. DB_USER, username for mysql server
4. DB_PASSWORD, password for mysql server access
5. DB_NAME, given dumped structure and data, db name is mini_wallet
6. DB_PORT, default for mysql is 3306


Build and run the project
npm start


Application is running in localhost with the port 3000
http://localhost:3000


## Running Unit Tests
## ##################

## Run all tests

cd <project_name>
jest

## OR

cd <project_name>
npm test

## Run a single unit test

cd <project_name>
npm test -- <path_to_test_file>



## Postman setup
## #############

First, send init api, with some customer_xid, to get generated token
curl --location --request POST 'http://localhost:3000/api/v1/init' \
--form 'customer_xid="ea0212d3-abd6-416f-8c67-868e8bca2439"'

Send other apis with Authorization Type is Bearer Token, fill in Token with the token generated from previous init api.


## NOTES
## #####

Some data are intended to be unique, such as customer_xid in init api and reference_id in deposits and withdrawals apis.
These unique constraints are set in the database level.