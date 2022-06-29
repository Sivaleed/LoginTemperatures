<script setup>
import { ref, reactive, watch } from 'vue'
import { userAuth } from '../stores/auth.store'
import InputText from './form/InputText.vue'

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

const isDisabled = ref(true)
const errors = ref(false)
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

//based on form field errors make submit button disbaled or enabled
watch( formAtt.value.formfields, () => {
    errors.value = false
    isDisabled.value = true

    for (const [key, value] of Object.entries(formAtt.value.formfields)) {
        if ( formAtt.value.formfields[key].error != "" ){
            errors.value = true
        }
    }

    if(!errors.value){
        isDisabled.value = false
    }
    
})


//form field validation messages
const validateInput = (e, f) => {    
    formAtt.value.formfields[f].error = "";    
    if( e.length < 4 ) {
      formAtt.value.formfields[f].error = 'Invalid '+ formAtt.value.formfields[f].label
    } 
}



const signIn = async () => {

    loader.value = true    

    const auth = userAuth()
    //Dynamically submit the JSON
    for (const [key, value] of Object.entries(formAtt.value.formfields)) {    
      Object.assign(formData, {[key]: value.value})
      //reset if any previous error messages 
      formAtt.value.formfields[key].error = ""
    }
    
    //Call auth login from stores state
    await auth.login(formData)
      .catch(e=>{
          //Backend error handling          
          e.forEach(e => {
              if( e.param === 'defaultError' ){
                defaultErr.value = e.msg  
              } else {
                formAtt.value.formfields[e.param].error = e.msg
              }
          })    
      })

    loader.value = false
}

</script>
<template>
  <div class="form-box">    
    <h2 class="green">{{ title }}</h2>    
    <p class="green" v-if="defaultMsg">{{ defaultMsg }}</p>
    <p class="error" v-if="defaultErr">{{ defaultErr }}</p>
    <form @submit.prevent="signIn" >
      <InputText 
        v-for="(item, index) in formAtt.formfields" 
        :att="item"
        :key="index"
        v-model="item.name"
        @validate-input="validateInput"
      >
      </InputText>
    <div class="form-fileds btn-box">      
      <button v-bind:disabled="isDisabled === true">
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