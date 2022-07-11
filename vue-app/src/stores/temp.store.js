import { defineStore } from 'pinia';
import { getData } from '../services/services'
import configJson from '../../config.json'

export const tempStore = defineStore('temp',{

    state: () => {
        return {
            temperature: JSON.parse(localStorage.getItem('temperature')),
        }
    },
    actions: {
        async createTemp(user) {
            
            //Call backend server endpoint
            await getData(2000, import.meta.env.VITE_API_URL + import.meta.env.VITE_API_END_POINT_CREATE_TEMPERATURE +'?id='+user.id, user.token)
            .then(r=>{
                return true
            })
            .catch(e=>{                  
                return Promise.reject(e.response.data.errors)
            })    
        
        },
        async getCities() {

            const cities = configJson?.config?.cities

            return Promise.resolve(cities)

        },
        async loadTemp(user){
            await getData(2000, import.meta.env.VITE_API_URL + import.meta.env.VITE_API_END_POINT_READ_TEMPERATURE+'?id='+user.id, user.token)
            .then(r=>{
             
                this.temperature = r
                localStorage.setItem('temperature', JSON.stringify(this.temperature))
                
            })
            .catch(e=>{
               
                return Promise.reject(e.response.data.errors)
            })
        },
        async removeLocalData(){
            localStorage.removeItem('temperature')
            
        }
         
    }   

})