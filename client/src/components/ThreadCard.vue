<script setup lang="ts">
import { RouterLink } from 'vue-router';


defineProps({
    title: String,
    id: Number,
    description: String,
})

</script>


<template>
    <router-link :to="`/`"
        class="card no-underline bg-primary-700 text-white border-round col-12 p-3 m-2 flex align-items-center justify-content-center gap-2">
        <article class="flex flex-column align-items-center gap-1">
            <div class="flex align-items-center gap-2">
                <span class="font-bold">{{ title }}</span>
            </div>
            <small v-if="description">{{ description }}</small>
        </article>
    </router-link>
</template>