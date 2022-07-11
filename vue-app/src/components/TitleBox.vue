<script setup>
defineProps({
  header: {
    type: String,
    required: true
  }
})
</script>

<template>
    <div class="header">
        <h1>
            {{header}}
        </h1>
    </div>    
</template>