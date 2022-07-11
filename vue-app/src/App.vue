<script setup>
import { Suspense} from 'vue'


</script>

<template>    
    <div class="wrapper">
      <router-view v-slot="{ Component }">
        <Suspense timeout="0">
          <template #default>
            <!-- <div class="container"> -->
              <component :is="Component"/>
            <!-- </div> -->
          </template>
          <template #fallback>
              <p class="loading" style="color: black;">Loading please wait ...</p>
          </template>
        </Suspense>
      </router-view>
    </div>
</template>


<style>
@import './assets/base.css';

body{
  background: white;
}

#app {
  margin: 0 auto;
  padding: 0srem;
  color: black;
  font-weight: normal;  
}

.wrapper{   
  margin: auto;
}

.wrapper .container {
  display: block;
  justify-content: center;  
}

.wrapper .container .header {
  line-height: 1.5;
  color: black;
  text-align: center;
  margin: auto auto 10px auto;
  display: block;
  width: 100%;
  border-bottom: 1px solid #ccc;
}

.wrapper .container .inner-container{
  display: flex;
  justify-content: space-evenly;
}

@media only screen and (max-width: 870px) {
  .wrapper .container .inner-container{
    display: block;    
    padding: 0;
  }
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


a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 10);
  transition: 0.4s;
}
.error{
  color:red;  
}
.text-center{
  text-align: center;
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
