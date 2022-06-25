import { defineStore } from 'pinia';

import {router} from '../router/router'

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
            await postData(3000, 'http://localhost:8080/user/signin', formData)
            .then(r=>{

                if(r?.errors){
                    return Promise.reject(r.errors)
                }
                
                //TODO: must check api key is avaailble with the json object
                if(r?.id){
                    console.log(r)
                    this.user = r
                    localStorage.setItem('user', JSON.stringify(this.user))
                    router.push('/dashboard');
                }
            })    
        
        },
        async register(formData){

            await postData(3000, 'http://localhost:8080/user/signup', formData)
            .then(r=>{

                if(r?.errors){
                    return Promise.reject(r.errors)
                }
                
                if(r?.id){
                    //if success redirect to login page
                    router.push('/');
                }
            })             
        },
        logout() {
            //TODO: must send the request to server and delete the session           
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }
    }   

})
