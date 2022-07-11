# LoginTemperatures
Login Temperatures / Fullstack Coding Challenge / Coderbyte.com

# Prerequisites

**Packages used for server side**

- NodeJs
- axios : Promise-based data fetching package 
- bcrypt : Package for hash password
- body-parser : parse to handle the request bodies as middleware
- sqlite3 : Interface for bind sqlite db 
- connect-sqlite3 : Session store model for sqlite db 
- cors : Enable All CORS Requests from different domains 
- dotenv : To declare environment/setting variables   
- express : Node.js web application framework
- express-validator : Package for validate form input etc... as middleware
- passport : Authentication package for node server as middleware
- passport-http-bearer : Bearer authentication strategy for Passport


**Packages used for vue app**

- vue
- vue-router
- axios : Promise-based data fetching package 
- moment : Package to handle date format
- pinia : Package to manage data stores


----------------------------------------------------------------

# Server - Setup 

NOTE: make sure you already have nodejs installed before continue 

1. Download source code from git
2. Go to LoginTemperatures/ folder using the command line and run the following commands
	- cd api
	- npm install

Above will install necessary packages and run "npm start" in the command line to start the nodejs server. 

3. open vue-app/.env file and change NODE_SERVER_PORT and NODE_SERVER_HOST variables if necessary. The default port is 8080 and default host is 127.0.0.1 (localhost)

# Vue App (Front Setup)

1. Go to LoginTemperatures/ folder using the command line and run the following commands
	- cd vue-app
	- npm install

Above will install necessary packages and run "npm run dev", or "npm run build" in the command line 

# Config  (there are 2 config files);
	
**2.1 .env (vue-app/ folder) defualt values are as follows**
	
#NODE SERVER SETTING VARIABLES PORT & HOST
NODE_SERVER_PORT = 8080
NODE_SERVER_HOST = 127.0.0.1

#API SETTING VARIABLES
OPEN_WEATHER_API_KEY = 8dc9ba99c4e5fe28f4dc20edbc1848c0
OPEN_WEATHER_URL = https://api.openweathermap.org/data/2.5/onecall


#VUE APP VARIABLES

VITE_API_URL = http://localhost:8080

VITE_API_END_POINT_LOGIN = /user/signin
VITE_API_END_POINT_REGISTRATION = /user/signup
VITE_API_END_POINT_LOGOUT = /user/logout

VITE_API_END_POINT_CREATE_TEMPERATURE = /temp/callweatherapi
VITE_API_END_POINT_READ_TEMPERATURE = /temp/get

**2.2 config.json (vue-app/ folder)**

Able to change the page headings (title), add new cities and add additionl fields for forms if needed.  


# Node Server Folder Structure (MVC)

controllers/ <br />
--validation/ <br />
----validation.js <br />
--userController.js <br />
--weatherController.js <br />
database/ <br />
--db (sqlite) <br />
models/ <br />
--user.js <br />
--weather.js <br />
public/ *<br />
routes/ <br />
--userRoute.js <br />

*public folder contains the generated vue-app build bundler. 

**Note: did not create the views/ folder as it's not necessary for this project 

# DB (/database folder)
# User table

CREATE TABLE IF NOT EXISTS "users" (<br />
        "id"    INTEGER,<br />
        "fullname"      varchar(20) NOT NULL,<br />
        "username"      varchar(10) NOT NULL UNIQUE,<br />
        "password"      varchar(10) NOT NULL,<br />
        "cities"        text NOT NULL,<br />
        "created_at"    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,<br />
        "login_session" varchar(255),<br />
        PRIMARY KEY("id" AUTOINCREMENT)<br />
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

# Vue App (vue-app/ folder) 

dist/<br/>
public/<br />
src/<br/>
--assets/<br />
--components/<br />
----form/<br />
------InputText.vue<br />
----DashboardView.vue<br />
----LoginBox.vue<br />
----RegisterBox.vue<br />
----TemperatureBox.vue<br />
----TitleBox.vue<br />
--router/<br />
----router.js<br />
--services/<br />
----services.js<br />
--stores/<br />
----auth.store.js<br />
----temp.store.js<br />
--App.vue<br />
--main.js<br />
.env<br />
config.json<br />
index.html<br />
package.json<br />
vite.config.js<br />
