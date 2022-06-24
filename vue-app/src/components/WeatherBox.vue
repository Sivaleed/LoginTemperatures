<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="weather-list">
    <h2>{{ title }}</h2>
    <ul>
        <li>
            <span class="date">Wed 10th July 2021, 16.00PM</span>
            <span> 33</Span>
            <span>100</span>
        </li>
        <li>
            <span class="date">Wed 10th July 2021, 16.00PM</span>
            <span> 33</Span>
            <span>100</span>
        </li>
        <li>
            <span class="date">Wed 10th July 2021, 16.00PM</span>
            <span> 33</Span>
            <span>100</span>
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
}

</style>
