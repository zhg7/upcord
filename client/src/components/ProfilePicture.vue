<script setup lang="ts">
import { computed } from 'vue';
import Avatar from 'primevue/avatar';

const props = defineProps({
    imageUrl: String,
    username: String,
    size: String,
})

// Placeholder para cuando el usuario no tiene una foto establecida.
const getUsernameFirstLetter = computed(() => {
    if (props.imageUrl === null){
        return props.username?.charAt(0).toUpperCase();
    }
})

</script>

<template>
    <Avatar :image=props.imageUrl :label=getUsernameFirstLetter size="xlarge" shape="circle" />
</template>