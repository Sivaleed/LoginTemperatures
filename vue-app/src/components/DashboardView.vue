<script setup>
import Weather from './WeatherBox.vue'
import Nav from './NavBox.vue'

</script>
<template>
    <Nav />
    <div class="inner-container">              
        <Weather title="Colombo" />
        <Weather title="Melbourne" />
    </div>
</template>