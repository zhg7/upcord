<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Card from 'primevue/card';


defineProps({
    title: String,
    id: Number
})

</script>


<template>
    <router-link to="/forum"
        class="card no-underline bg-primary md:max-w-28rem border-round md:col-6 p-3 m-2 flex align-items-center justify-content-center gap-2">
        <img src="https://placehold.co/32x32?text=:)" alt="">
        <span>{{ title }}</span>
    </router-link>
</template>
