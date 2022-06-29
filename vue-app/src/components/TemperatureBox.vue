<script setup>
import moment from 'moment';

const props = defineProps({
  cityname:{
    type: String
  },
  rows:{
    type: Object
  }
})

</script>

<template>
    <div class="weather-list">
        <h2>{{ cityname }}</h2>
        <ul>
          <li v-for="(row, key, idx) in rows">              
              <span class="date">{{ moment(row.created_at).format('ddd, d MMMM  YYYY, h:mm a') }}</span>
              <span> {{row.celsius}} &#x2103;</span>
              <span> {{row.fahrenheit}} &#x2109; </span>
          </li>
        </ul>  
    </div>
</template>

<style scoped>
.weather-list{
  width: 500px;
  padding: 0.5rem;
  margin: 1rem;
  background-color: #fdfdfd;
  border-radius: 1rem;
  border: 1px solid #dfdfdf;
}

.weather-list ul{
    list-style: none;
    padding: 0;
    /* background: red; */
}

.weather-list ul li{
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    border-bottom:1px solid #ccc;
}

</style>
