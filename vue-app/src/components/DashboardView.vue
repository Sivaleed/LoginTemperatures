<script setup>
import { ref, computed, reactive } from 'vue'
import TemperatureBox from './TemperatureBox.vue'
import { userAuth } from '../stores/auth.store'
import { tempStore } from '../stores/temp.store'

const defaultErr = ref()
const warning = ref(null)
const loader = ref(false)
const hottestLabel = ref(true)

const logout = async () => {
    warning.value = 'Please wait while your being logout.'
    
    await userAuth().logout()
    .catch(e => {
        
        e.forEach(e => {
            if( e.param === 'defaultErr' ){
                defaultErr.value = e.msg  
            } 
        })
    }) 

    warning.value = '' 
}

//Retrive data from tempstore
const temperatureData = reactive(tempStore()?.temperature?.data)   

/**
 * Data sorting method
 */
const dataSort = (s=false, f, sf) => {
    return s ? temperatureData[f].sort((a,b) => b[sf] - a[sf]) : temperatureData 
}


/**
 * Hottest/Coolest Button handler
 */
const hottest = () => {   
    hottestLabel.value = !hottestLabel.value    
    if(!hottestLabel.value){
        dataSort(true, Object.keys(temperatureData)[0], 'celsius')
        dataSort(true, Object.keys(temperatureData)[1], 'celsius')  
    } else {
        dataSort(true, Object.keys(temperatureData)[0], 'celsius').reverse()
        dataSort(true, Object.keys(temperatureData)[1], 'celsius').reverse()  
    }
}

/**
 * Data reset handler
 */
const reset = () => {
    dataSort(true, Object.keys(temperatureData)[0], 'id')
    dataSort(true, Object.keys(temperatureData)[1], 'id')
}


</script>
<template>
    <ul class="nav">
        <li>
            <button :class="[hottestLabel ? 'purple-bg' : 'blue-bg']" @click="hottest">
                    {{hottestLabel ? 'Hottest First' : 'Coolest First'}}                
            </button>
        </li>
        <li>
            <button @click="reset">Reset Order</button>
        </li>
        <li>
            <button @click="logout">Logout</button>
        </li>
    </ul>
    <p class="green text-center" v-if="warning">{{warning}}</p>
    <p class="error text-center" v-if="defaultErr">{{defaultErr}}</p> 
    <div class="inner-container">
        <p class="error" v-if="!temperatureData">Sorry no data availble at this time.</p>
        <TemperatureBox :cityname="key" :rows="value" v-for="(value, key, idx) in temperatureData" v-if="temperatureData" />
    </div>
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
.purple-bg{
    background: purple;
    color: white;
}
.blue-bg{
    background: blue;
    color: white;
}
</style>