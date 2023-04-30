<script setup lang="ts">
import { computed } from 'vue';
import Avatar from 'primevue/avatar';

const props = defineProps({
    user: Object,
    size: String,
})

const usernameFirstLetter = props.user?.username

const userAvatar = computed(() => {
    return props.user?.avatar !== null 
})

</script>

<template>
    <Avatar image="https://avatarfiles.alphacoders.com/321/321781.png" label="" size="xlarge" shape="circle" />
</template>