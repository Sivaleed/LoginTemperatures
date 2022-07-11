<script setup>
import { ref, reactive, watch } from 'vue'
import { userAuth } from '../stores/auth.store'
import { tempStore } from '../stores/temp.store'
import InputText from './form/InputText.vue'
import Title from './TitleBox.vue'
import configJson from '../../config.json'


//Initial call when form loading
const formAtt = ref(configJson?.config?.forms?.regsitration)

const isDisabled = ref(true)
const errors = ref(false)
const header = ref(configJson?.config?.pagetitles?.regsitration)
const title = ref("")
const loader = ref(false)
const formData = reactive({})
const defaultMsg = ref(null)
const defaultErr = ref(null)
const cities = ref(await tempStore().getCities())


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
    
    const regex_username = /^[a-z0-9_-]{4,8}$/
    const regex_password = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$/
    
    formAtt.value.formfields[f].error = "";
    
    if(formAtt.value.formfields[f].name === 'fullName') {       
        
      if( e.length < 4 ) {
        formAtt.value.formfields[f].error = formAtt.value.formfields[f].label +' must contain more than 4 characters'
      } 
    }

    if(formAtt.value.formfields[f].name === 'userName') { 
     
      if( !regex_username.exec(e) ) {
        formAtt.value.formfields[f].error = formAtt.value.formfields[f].label +' must contain 4 to 8 alphanumeric letters'
      }
    } 

    if(formAtt.value.formfields[f].name === 'password') {    
      if( !regex_password.exec(e) ) {
        formAtt.value.formfields[f].error = formAtt.value.formfields[f].label +' 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 6 characters long'
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
    defaultErr.value = null
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
              if( e.param === 'defaultErr' ){
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
  <div class="container">
    <Title :header="header" />
    <div class="form-box">
      <h2 class="green">{{ title }}</h2>
      <p class="green text-center" v-if="defaultMsg">{{ defaultMsg }}</p>
      <p class="error text-center" v-if="defaultErr">{{ defaultErr }}</p>
      <p class="green text-center" v-if="loader">Please wait...</p>
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
    </form>
    <router-link to="/" class="nav-item nav-link">Already a user? Sign In</router-link>
    </div>
  </div>
</template>

<style scoped>

/**styles to be defined */
</style>
