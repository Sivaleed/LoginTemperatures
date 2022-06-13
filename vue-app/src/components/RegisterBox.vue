<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="form-box">
    <h2 class="green">{{ msg }}</h2>
    <form>
    <div class="form-fileds">
        <label>Fullname: </label>    
        <input 
            type="text"
            placeholder="Username"                
        >
    </div>
    <div class="form-fileds">
        <label>Username: </label>    
        <input 
            type="text"
            placeholder="Username"                
        >
    </div>
    <div class="form-fileds">
        <label>Password: </label>
        <input 
            type="password"
            placeholder="Password"                
        >
     </div>
     <div class="form-fileds">
        <label>Confirm Password: </label>
        <input 
            type="password"
            placeholder="Confirm password"                
        >
     </div>
     <div class="form-fileds">
        <label>Select Cities: </label>
        <select>
            
        </select>
     </div>
     <div class="form-fileds btn-box">
        <button>
        Sign Up
        </button>
    </div>
  </form>
  </div>
</template>

<style scoped>
/* h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
