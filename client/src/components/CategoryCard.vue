<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Panel from 'primevue/panel';
import ForumCard from './ForumCard.vue';

defineProps({
    title: String,
    id: Number
})

</script>

<template>
    <div class="card">
        <Panel :header=title toggleable collapsed class="mb-3">
            <div class="grid justify-content-center">
                <ForumCard title="General"/>
                <ForumCard title="General"/>
                <ForumCard title="General"/>
                <ForumCard title="General"/>
            </div>
        </Panel>
    </div>
</template>