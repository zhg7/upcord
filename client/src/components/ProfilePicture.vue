<script setup lang="ts">
import { computed } from 'vue';
import Avatar from 'primevue/avatar';
import { RouterLink } from 'vue-router';

const props = defineProps({
    imageUrl: String,
    username: String,
    imageSize: String
})

// Placeholder para cuando el usuario no tiene una foto establecida.
const getUsernameFirstLetter = computed(() => {
    if (props.imageUrl === null) {
        return props.username?.charAt(0).toUpperCase();
    }
})

</script>

<template>
    <router-link :to="`/profile/${props.username}`" class="text-white">
        <Avatar v-if="props.imageSize === 'xlarge'" :image=props.imageUrl :label=getUsernameFirstLetter shape="circle"
            size="xlarge" />
        <Avatar v-if="props.imageSize === 'large'" :image=props.imageUrl :label=getUsernameFirstLetter shape="circle"
            size="large" />
        <Avatar v-if="props.imageSize === 'normal'" :image=props.imageUrl :label=getUsernameFirstLetter shape="circle"
            size="normal" />
    </router-link>
</template>