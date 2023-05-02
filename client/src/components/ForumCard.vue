<script setup lang="ts">
import { RouterLink } from 'vue-router';


defineProps({
    title: String,
    id: Number
})

</script>


<template>
    <router-link :to="`/forum/${id}`"
        class="card no-underline bg-primary border-round col-12 p-3 m-2 flex align-items-center justify-content-center gap-2">
        <span>{{ title }}</span>
    </router-link>
</template>
