import { defineStore } from 'pinia';

import {router} from '../router/router'

export const userAuth = defineStore('auth',{

    state: () => {
        return {
          user: JSON.parse(localStorage.getItem('user')),          
          returnUrl: null
        }
    },
    actions: {
        async login(username, password) {

            //temp code ----------------------
          
            if( username == 'demo' && password == 'demo' ){
                this.user = {apiKey: 'somekey', fullName: 'Demo Test'}
                localStorage.setItem('user', JSON.stringify(this.user))
                router.push('/dashboard');
            } else {
                return Promise.reject({error:{msg:"Incorrect username or password"}})
            }   
            
            //temp code end --------------------
          
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }
    }   

})
