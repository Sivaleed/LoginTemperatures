import { defineStore } from 'pinia';
import { getData } from '../services/services'

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
            //temp code             
            const cities = [
                { id: 1, name: "Colombo", lat: "6.9271", lon: "79.8612" },
                { id: 2, name: "Chicago", lat: "33.44", lon: "-94.04" },
                { id: 3, name: "Melbourne", lat: "37.8136", lon: "144.9631" },
                { id: 4, name: "London", lat: "51.5072", lon: "0.1276" },
                { id: 5, name: "Cape Town", lat: "33.9249", lon: "18.4241" },
            ]    

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