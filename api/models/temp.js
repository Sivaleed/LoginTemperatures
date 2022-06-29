const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const db_path = path.join(__dirname, '../database','db');

const db = new sqlite3.Database(db_path);




/**
 * Insert temperature data into temperature table
 * can added multi records in in single request
 * 
 * @param array  
 * @returns id Integer (last inserted id)
 */

const createMultiTemp = async (arr) => {  
    
    const placeholders = arr.map(() => "(?,?,?,?,?)").join(",");
    
    //make the array object into flatten array
    const newArr = []    
    arr.map((r) => Object.values(r)).map( r => newArr.push(...r))
        
    const sql = 'INSERT INTO temperature (user_id, city_id, city_name, celsius, fahrenheit ) VALUES '+ placeholders;
    return new Promise(function(resolve, reject) {
      db.run(sql, newArr, (error) => {
          
          if (error) {
              reject("Read error: " + error.message)     
          } 
            
            
          resolve(true)
          
      })
    })
    
}

/**
 * Retrive temperature list
 * @param {*} id 
 * @returns Object 
 */

const getTempByUserId = async (id) => {

  return new Promise(function(resolve, reject) {
    db.all("SELECT id, city_name, celsius, fahrenheit, datetime(created_at, 'localtime') as created_at FROM temperature WHERE user_id=? ORDER BY created_at DESC", id, (error, row) => {
      if(error) { 
        reject("Read error: " + error.message)
      } else {
        resolve(row)
      }
    })
  })    
}

module.exports = {
    createMultiTemp,
    getTempByUserId    
}

