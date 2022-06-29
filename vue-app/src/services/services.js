import axios from 'axios'

//function use for GET request
export async function getData(timeout = 2000, url) {
  
  //return promise
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(url)

      setTimeout(async () => {
        resolve(await res.data);
      }, timeout);

    } catch (err) {
      
      reject(err); //reject with error
     }
  });
}

//function use POST request
export async function postData(timeout = 2000, url, Obj){
  
  //return promise
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(url, Obj)

      setTimeout(async () => {
        resolve(await res.data);
      }, timeout);

    } catch (err) {      
      reject(err); //reject with error      
    }
  });

}