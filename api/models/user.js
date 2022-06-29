const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const db_path = path.join(__dirname, '../database','db');

const db = new sqlite3.Database(db_path);

/**
 * function will return user data by providing user table field name and value
 * 
 */

const findOne = async (fieldName, value) => {

  //promise return
  return new Promise(function(resolve, reject) {
    db.get('SELECT * FROM users WHERE '+ fieldName +' = ?', value, (error, row) => {
      if(error) { 
        reject("Read error: " + error.message)
      } else {
        resolve(row)
      }
    })
  })
}

// Insert a new user into the database
const createUser = async (obj) => { 
    
    const fullname = obj.fullName;
    const username = obj.userName;
    const password = obj.password;
    const cities =  JSON.stringify(obj.selectedCity);
    
    return new Promise(function(resolve, reject) {
      db.run('INSERT INTO users (fullname, username, password, cities) VALUES (?, ?, ?, ?)', 
                [fullname, username, password, cities], (error) => {
        
        if (error) {
            reject("Read error: " + error.message)     
        } else {
              //if user row created then take last insert id from table
              db.get('SELECT last_insert_rowid()', (error, row)=>{

              if(error){                
                reject("Read error: " + error.message) 
              }

              //return with last created user id
              resolve({id: row['last_insert_rowid()']})
            })
        }
      })
    })
};

const updateUser = async (Obj) => {
    
} 

module.exports = {
  createUser,
  findOne,
}