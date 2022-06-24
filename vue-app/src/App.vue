<script setup>
import { Suspense } from 'vue';
import Title from './components/TitleBox.vue'
</script>

<template>    
    <div class="wrapper">
        <Suspense>
            <template #default>
                <div class="container">
                    <Title title="Dynamic Header" />
                    <router-view />
                </div>
            </template>
            <template #fallback>
                <p class="loading">Loading please wait ...</p>
            </template>
        </Suspense>
    </div>
 </template>

<style>
@import './assets/base.css';

body{
  background: white;
}

#app {
  /* max-width: 1280px; */
  margin: 0 auto;
  padding: 2rem;
  color: black;
  font-weight: normal;
}

.wrapper{
  /* background: red; */
}

.wrapper .container {
  /* line-height: 1.5;
  color: black;  */
  /* background: gray; */
  display: block;
  justify-content: center;
  
}

.wrapper .container .header {
  line-height: 1.5;
  color: black;
  text-align: center;
  margin: auto;
  display: block;
  width: 100%;
  border-bottom: 1px solid #ccc;
}

.wrapper .container .inner-container{
  display: flex;
}

.wrapper .container .form-box{  
  width: 350px; 
  padding: 0.5rem;
  margin: 1rem auto;
  background-color: #fdfdfd;
  border-radius: 1rem;
  border: 1px solid #dfdfdf;
}

.wrapper .container div h2{
  text-align: center;
}

.wrapper .container .form-box .form-fileds{
  width: 90%;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  border: none;
  /* border-bottom: 1px solid #ccc; */
}

.wrapper .container .form-box .form-fileds input{
  padding: 3px;
  border-radius: 5px;
}


.wrapper .container .form-box .btn-box{
  justify-content: center;
  border: none;
}

/* .logo {
  display: block;
  margin: 0 auto 2rem;
} */

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 10);
  transition: 0.4s;
}
.error{
  color:red;
}
@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

.loading{
  text-align: center;
}
</style>
