# LoginTemperatures
Login Temperatures / Fullstack Coding Challenge / Coderbyte.com

# Prerequisites

- Node.Js
- Vue Cli
- express  
- dotenv 
- sqlite3 
- express-validator 
- express-session 
- connect-sqlite3 
- bcrypt
- cookie-parser * (To be deside)
--------------------------------------------------------------------------------------------------------------
# Folder Structure (Login Temperatures)

mkdir login-temperatures
cd login-temperatures

# NodeJs for server (/api folder)

Create folder inside the login-temperatures for NodeJs server

mkdir api
cd api
npm init

# Packages
npm install express dotenv sqlite3 express-validator express-session connect-sqlite3 bcrypt 

# Node Server Folder Structure (MVC)

controllers/
--validation/
----validation.js
--userController.js
--weatherController.js
database/
--db (sqlite)
models/
--user.js
--weather.js
routes/
--userRoute.js


**Note: did not create the views/ folder as it's necessary for this project 

# DB (/database folder)
# User table

CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname varchar(20) NOT NULL, username varchar(10) NOT NULL UNIQUE, password varchar(10) NOT NULL, city text NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);

# User Weather Table (To do)

*Todo

------------------------------------------------------------------------------------------------------------

# Setingup Vue (/vue-app)

Go to login-temperatures folder run below command

npm init vue@latest

Base screens such as login, dashboad etc...

