<script setup>
import { userAuth } from '../stores/auth.store'

const logout = () => {
    const auth = userAuth()
    auth.logout()  
}

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
        <button @click="logout">Logout</button>
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
