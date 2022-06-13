<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <ul class="nav">
    <li>
        <button>Hottest First</button>
    </li>
    <li>
        <button>Reset Order</button>
    </li>
    <li>
        <button>Logout</button>
    </li>
  </ul>
</template>

<style scoped>
.nav{
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: flex-end;
}
.nav li{
    margin: 0.5rem;  
}
</style>
