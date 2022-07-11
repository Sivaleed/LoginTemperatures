<script setup>
import { ref, reactive } from 'vue'
import TemperatureBox from './TemperatureBox.vue'
import Title from './TitleBox.vue'
import { userAuth } from '../stores/auth.store'
import { tempStore } from '../stores/temp.store'
import configJson from '../../config.json'

const defaultErr = ref()
const warning = ref(null)
const hottestLabel = ref(true)
const header = ref(configJson?.config?.pagetitles?.dashboard)

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

    return s ? temperatureData[f].sort((f1,f2) => {
        
        const a = sf === 'created_at' ? new Date(f1[sf]) : f1[sf]
        const b = sf === 'created_at' ? new Date(f2[sf]) : f2[sf]

        return b - a 

    }) : temperatureData
     
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
    dataSort(true, Object.keys(temperatureData)[0], 'created_at')
    dataSort(true, Object.keys(temperatureData)[1], 'created_at')
}


</script>
<template>
    <div class="container">
        <Title :header="header" />
        <ul class="nav">
            <li>
                <button :class="[hottestLabel ? 'purple-bg' : 'blue-bg']" @click="hottest">
                        {{hottestLabel ? 'Hottest First' : 'Coolest First'}}                
                </button>
            </li>
            <li>
                <button @click="reset" class="dark-purple-bg">Reset Order</button>
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
    </div>
</template>

<style scoped>
.nav{
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
}
.nav li{
    margin: 0.5rem;  
}
.nav li button{
    padding: 0.4rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
}

.purple-bg{
    background:palevioletred;
    color: black;
}
.blue-bg{
    background: lightblue; 
    color: black;
}

.dark-purple-bg{
    background: purple;
    color: white;
}

</style>