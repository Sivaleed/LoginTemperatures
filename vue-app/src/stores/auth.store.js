import { defineStore } from 'pinia';
import { router } from '../router/router'
import { tempStore  } from '../stores/temp.store'
import { postData } from '../services/services'

export const userAuth = defineStore('auth',{

    state: () => {
        return {
          user: JSON.parse(localStorage.getItem('user')),          
          returnUrl: null
        }
    },
    actions: {
        async login(formData) {
           
            //Callback end server endpoint
            await postData(1000, import.meta.env.VITE_API_URL + import.meta.env.VITE_API_END_POINT_LOGIN , formData)
            .then(r=>{
               
                //TODO: must check api key is availble with the json object
                if(r?.id){          
                    this.user = r
                    localStorage.setItem('user', JSON.stringify(this.user))
                    return true;
                } else {
                    router.push('/')    
                }
            })  
            .then( async (r) => {
                //Retrive data from 
                if(r){
                    
                 return await tempStore().createTemp(this.user.id)
                    .then(r=>{
                        
                        return true
                    })
                    .catch(e=>{
                        
                        //TODO if data failed to load into store then better display warining message
                        return false
                    })
                }
                
            })
            .then( async (r)=>{
                
                await tempStore().loadTemp(this.user.id)

                if(r){
                    router.push('/dashboard')
                }

            }).catch(e=>{
                
                if(e?.response?.data?.errors){                   
                    e.response.data.errors.push({param : 'defaultError', msg : 'See below error(s)' })
                    return Promise.reject(e.response.data.errors)
                } else {
                    return Promise.reject([{param : 'defaultError', msg : e.message }])
                }
                                
            })    
        
        },
        async register(formData){

            await postData(3000, import.meta.env.VITE_API_URL + import.meta.env.VITE_API_END_POINT_REGISTRATION, formData)
            .then(r=>{
                             
                if(r?.id){
                    //if success redirect to login page
                    router.push('/');
                }
            })
            .catch(e=>{
                //return Promise.reject(e.response.data.errors)
                if(e?.response?.data?.errors){                   
                    e.response.data.errors.push({param : 'defaultError', msg : 'See below error(s)' })
                    return Promise.reject(e.response.data.errors)
                } else {
                    return Promise.reject([{param : 'defaultError', msg : e.message }])
                }
            })             
        },
        async logout() {
            //TODO: must send the request to server and delete the session            
            await tempStore().removeLocalData() //Remove local data from client
            this.user = null            
            localStorage.removeItem('user')
            router.push('/')
        }
    }   

})
