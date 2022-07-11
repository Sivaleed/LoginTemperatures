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

# NodeJs for server (api/ folder)

Create folder inside the login-temperatures for NodeJs server

mkdir api
cd api
npm init

# Packages
npm install express dotenv sqlite3 express-validator express-session connect-sqlite3 bcrypt 

# Node Server Folder Structure (MVC)

controllers/ <br />
--validation/ <br />
----validation.js <br />
--userController.js <br />
--tempController.js <br />
database/ <br />
--db (sqlite) <br />
models/ <br />
--user.js <br />
--temp.js <br />
routes/ <br />
--userRoute.js <br />


**Note: did not create the views/ folder as it's necessary for this project 

# DB (database/ folder)
# User table

CREATE TABLE IF NOT EXISTS "users" (<br />
        "id"    INTEGER,<br />
        "fullname"      varchar(20) NOT NULL,<br />
        "username"      varchar(10) NOT NULL UNIQUE, <br />
        "password"      varchar(100) NOT NULL,<br />
        "cities"        text NOT NULL,<br />
        "created_at"    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, <br />
        "token" varchar(255),<br />
        PRIMARY KEY("id" AUTOINCREMENT) <br />
);

# Temperature Table

CREATE TABLE IF NOT EXISTS "temperature" (<br />
	"id"    INTEGER,<br />
	"user_id"       INTEGER NOT NULL,<br />
	"city_id"       INTEGER NOT NULL,<br />
	"city_name"     varchar(255) NOT NULL,<br />
	"celsius"       REAL(3, 2),<br />
	"fahrenheit"    REAL(3, 2),<br />
	"created_at"    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,<br />
	PRIMARY KEY("id" AUTOINCREMENT)<br />
);


------------------------------------------------------------------------------------------------------------

# Setingup Vue (vue-app/)

Go to login-temperatures folder run below command

npm init vue@latest

Base screens such as login, dashboad etc...

