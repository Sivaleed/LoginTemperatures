<script setup>
const props = defineProps({
  att:{
    type: Object
  },
  options:{
    type: Array
  }
})

</script>

<template>
  <div class="form-field">
    <label>{{att.label}} :</label>
    <input 
      @input="$emit('validate-input', $event.target.value, att.name)"      
      :type="att.type"       
      v-model.trim="att.value"
      v-if="att.type==='text' || att.type==='password'"
    />
    <select 
      :name="att.name"
      v-model="att.value" 
      v-else-if="att.type=='select'"
      multiple
      @change="$emit('validate-input', $event.target.value, att.name)"
      >      
      <option v-for="option in options">
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

