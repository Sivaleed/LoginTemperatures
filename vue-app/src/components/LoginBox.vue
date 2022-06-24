<script setup>
import { ref, reactive } from 'vue'
//import { RouterLink, RouterView } from 'vue-router';
import InputText from './form/InputText.vue'
//import { getData, postData } from '../../services/services'

//const formAtt = ref(await getData(2000, 'http://localhost:8080/json/signinForm.json'))
const formAtt = ref({
	"formtitle": "Sign In",
	"formfields":{
        "userName":{
            "validation": "", 
            "label": "Username", 
            "error": "", 
            "placeholder": "", 
            "type":"text", 
            "name": "userName", 
            "value" :""
        },
        "password":{
            "validation": "", 
            "label": "Password", 
            "error": "", 
            "placeholder": "", 
            "type":"password", 
            "name":"password", 
            "value":""
        }
    }
})

const title = ref("")
const loader = ref(false)
const formData = reactive({})
const defaultMsg = ref(null)
const defaultErr = ref(null)

if( formAtt?.value?.error ) {
  throw new Error(formAtt?.value?.error)
} else {
  title.value = formAtt?.value?.formtitle;
}

const signIn = async () => {

    loader.value = true
    console.log(formAtt.value.formfields)    
    loader.value = false
}

</script>
<template>
  <div class="form-box">
    <h2 class="green">{{ title }}</h2>
    <p class="green" v-if="defaultMsg">{{ defaultMsg }}</p>
    <p class="red" v-if="defaultErr">{{ defaultErr }}</p>
    <form @submit.prevent="signIn" >
      <InputText 
        v-for="(item, index) in formAtt.formfields" 
        :att="item"        
        :i="index"
        :key="index"
      >
      </InputText>
    <div class="form-fileds btn-box">      
      <button>
        Sign in
      </button>
    </div>
    <p class="green" v-if="loader">Please wait...</p>
  </form>
  <router-link to="/register" class="nav-item nav-link">New user? Sign Up</router-link>
  </div>
</template>

<style scoped>
/** styles to be defined  */
</style>