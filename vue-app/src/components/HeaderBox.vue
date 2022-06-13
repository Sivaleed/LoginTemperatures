<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
<div class="header">
    <h1>
        {{msg}}
    </h1>
</div>    
</template>