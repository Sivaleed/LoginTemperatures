const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const db_path = path.join(__dirname, '../database','db');

const db = new sqlite3.Database(db_path);

// Find user by username
function findUser (username, callback) {
 const sql = 'SELECT * FROM users WHERE username = ?';
 db.get(sql, [username], (error, row) => {
   if (error) {
     //callback(error.message);
   } else {
     //callback(row);
   };
 });
};

// Insert a new user into the database
function registerUser (email, callback) {

    const fullname = "dddd";
    const username = "ffff";
    const password = "vbndwe";
    const city = "array of data";

 const sql = 'INSERT INTO users (fullname, username, password, city) VALUES (?, ?, ?, ?)';

 db.run(sql, [fullname, username, password, city], (error, row) => {
   if (error) {
     //callback(error.message);
     return error;
   } 
     return true;   
 });
};

// Export functions
module.exports = {
 registerUser,
 findUser
}