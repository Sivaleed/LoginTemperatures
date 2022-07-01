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

/**
 * function will check token and return user object
 * @param {*} obj 
 * @param {*} cb must need callback function 
 */

const findToken = async (obj, cb) => {
    
    db.get('SELECT * FROM users WHERE '+ Object.keys(obj)[0] +' = ?', obj[Object.keys(obj)[0]], (error, row) => {
      if(error) {         
          return cb(error, null)
      } 
      if(!row) {         
          return cb(null, false)
      }
      delete row.password              
      return cb(null, row)
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

/**
 * Update user
 * @param {*} obj 
 * @param {*} cb
 *  
 */

const updateUser = async (obj, cb) => {
    
    db.run("UPDATE users SET token=$token WHERE id=$id", {$token: obj.token, $id:obj.id}, function(error) {              
        if (error) { 
            return cb(error); 
        }

        if(!this.changes){
            return cb(null, null);  
        }

        return cb(null, this.changes);
    })

}

module.exports = {
    createUser,
    findOne,
    findToken,
    updateUser,
}