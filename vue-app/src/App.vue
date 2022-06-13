<script setup>
import Login from './components/LoginBox.vue';
import Register from './components/RegisterBox.vue';
import Header from './components/HeaderBox.vue';
import Nav from './components/NavBox.vue';
import Weather from './components/WeatherBox.vue';
</script>

<template>    
    <div class="wrapper">
      <Header msg="Dynamic Header" />
      <!--Display if user logged in-->
      <Nav />

      <div class="container">
        <Login msg="Sign in" />
        <Register msg="New User? Sign up" />
        <!--Display if user logged in-->
        <!-- <br />
        <Weather title="Colombo" />
        <Weather title="Melbourne" /> -->
      </div>
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

.wrapper .header {
  line-height: 1.5;
  color: black;
  text-align: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.wrapper .container {
  /* line-height: 1.5;
  color: black; 
  background: gray;*/
  display: flex;
  justify-content: center;
  
}

.wrapper .container .form-box{  
   width: 350px; 
  padding: 0.5rem;
  margin: 1rem;
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
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  /*body {
    display: flex;
     place-items: center; 
     background: white;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    padding: 2rem;
    background: white;
  }

   header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } */

  /* header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */

/* .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
}

.logo {
    margin: 0 2rem 0 0;
  } */
}
</style>
