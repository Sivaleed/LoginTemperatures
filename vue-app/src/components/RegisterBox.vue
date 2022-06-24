<script setup>
import { ref, reactive } from 'vue'
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
		"cities": { "label": "Select 2 Cities", "error": "", "placeholder": "", "type":"select", "name":"cities", "options":[
			{ "text": "Colombo", "value": "A" },
			{ "text": "Los Angles", "value": "B" },
			{ "text": "Toronto", "value": "C"}
		], 
		"value":""}
	}
})

const title = ref("")
const loader = ref(false)
const formData = reactive({})
const defaultMsg = ref(null)
const defaultErr = ref(null)

//if any errors from server 
if( formAtt?.value?.error ) {
  throw new Error(formAtt?.value?.error)
} else {
  title.value = formAtt?.value?.formtitle;
}

//form submit
const signUp = async () => {

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
    <form 
      @submit.prevent="signUp"
    >
    <InputText 
      v-for="(item, index) in formAtt.formfields" 
      :att="item"
      :i="index"
      :options="item?.options"
      :key="index"
    />    
    <div class="form-fileds btn-box">
      <button>
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
