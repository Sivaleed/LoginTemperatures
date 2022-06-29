<script setup>
import { ref, reactive, watch } from 'vue'
import { userAuth } from '../stores/auth.store'
import { tempStore } from '../stores/temp.store'
import InputText from './form/InputText.vue'


//Initial call when form loading
const formAtt = ref({
  "pagetitle": "",
	"formtitle": "Sign Up",
	"formfields":
	{
		"fullName": { "label": "Full Name", "error": "", "placeholder": "Your name", "type": "text", "name": "fullName", "value":"", "validation":"" },
		"userName": { "label": "Username", "error": "", "placeholder": "", "type":"text", "name":"userName", "value":""},
		"password": { "label": "Password", "error": "", "placeholder": "", "type":"password", "name":"password", "value":""},
		"confirmPassword": { "label": "Confirm Password", "error": "", "placeholder": "", "type":"password", "name":"confirmPassword", "value":""},
		"cities": { "label": "Select 2 Cities", "error": "", "placeholder": "", "type":"select", "name":"cities", "options": "true", 
		"value":""}
	}
})

const isDisabled = ref(true)
const errors = ref(false)
const title = ref("")
const loader = ref(false)
const formData = reactive({})
const defaultMsg = ref(null)
const defaultErr = ref(null)
const cities = ref(await tempStore().getCities())

//if any errors from server 
if( formAtt?.value?.error ) {
  throw new Error(formAtt?.value?.error)
} else {
  title.value = formAtt?.value?.formtitle;
}


//based form field errors submit button disbaled or enabled
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


//form field validation message populate
const validateInput = (e, f) => {    
    formAtt.value.formfields[f].error = "";
    
    if(formAtt.value.formfields[f].name === 'fullName' || formAtt.value.formfields[f].name === 'userName') {    
      if( e.length < 4 ) {
        formAtt.value.formfields[f].error = formAtt.value.formfields[f].label +' must contain more than 4 characters'
      } 
    } 

    if(formAtt.value.formfields[f].name === 'password') {    
      if( e.length < 6 ) {
        formAtt.value.formfields[f].error = formAtt.value.formfields[f].label +' must contain more than 6 characters'
      }
    } 

    if(formAtt.value.formfields[f].name === 'confirmPassword' && formAtt.value.formfields[f].value !== formAtt.value.formfields.password.value){
        formAtt.value.formfields[f].error = formAtt.value.formfields[f].label +' dose not match'
    }
    
    if(formAtt.value.formfields[f].name === 'cities'){
        if( formAtt.value.formfields[f].value.length !== 2 ){
            formAtt.value.formfields[f].error = 'Please select 2 '+ formAtt.value.formfields[f].label
        }
    }

}

//form submit
const signUp = async () => {
    loader.value = true    

    const auth = userAuth()
    //Dynamically submit the JSON
    for (const [key, value] of Object.entries(formAtt.value.formfields)) {    
      Object.assign(formData, {[key]: value.value})
      //reset if any previous error messages 
      formAtt.value.formfields[key].error = ""
    }
    
    //Call auth register from stores
    await auth.register(formData)
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
    <p class="red" v-if="defaultErr">{{ defaultErr }}</p>
    <form 
      @submit.prevent="signUp"
    >
    <InputText 
      v-for="(item, index) in formAtt.formfields" 
      :att="item"      
      :options="item?.options? cities : null"
      :key="index"
      @validate-input="validateInput"      
    />    
    <div class="form-fileds btn-box">
      <button v-bind:disabled="isDisabled === true">
        Sign Up
      </button>
    </div>
    <p class="green" v-if="loader">Please wait...</p>
  </form>
  <router-link to="/" class="nav-item nav-link">Already a user? Sign In</router-link>
  </div>
</template>

<style scoped>
/**styles to be defined */
</style>
