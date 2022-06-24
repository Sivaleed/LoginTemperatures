<script setup>
const props = defineProps({
  att:{
    type: Object
  },
  options:{
    type: Array
  }

})


//TEST PURPOSE: handle form input errors
const d = () => {
  console.log('todo: client side validation.')
}

</script>

<template>
  <div class="form-field">
    <label>{{att.label}} :</label>
    <input 
      @focus="d"
      :type="att.type" 
      :name="att.value" 
      v-model.trim="att.value"
      v-if="att.type==='text' || att.type==='password'"
    />
    <select 
      :name="att.name"
      v-model="att.value" 
      v-else-if="att.type=='select'"
      multiple
      >      
      <option v-for="option in options" :value="option.value">
        {{option.text}}
      </option>
    </select>
    <p class="error" v-if="att.error">
      {{att.error}}
    </p>
  </div>
</template>

<style scoped>
  .form-field{
    /* display: ; */
    justify-content: space-between;
    padding: 0.5rem;
    margin-bottom:0.5rem;
    background: #fdfdfd;
    border:1px solid #dfdfdf;
    border-radius: 0.5rem;
  }
  label{
    width: 100%;
    display: block;
    margin-bottom:0.5rem;
  }
  input{
    padding: 0.3rem;
    border-radius: 0.5rem;
  	width:95%;
  }

</style>

