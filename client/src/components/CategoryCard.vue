<script setup lang="ts">
import Panel from 'primevue/panel';
import ForumCard from './ForumCard.vue';
import type { Subforum } from '@/types/Forum'

defineProps({
    title: String,
    subforums: Array<Subforum>
})

</script>

<template>
    <div class="card">
        <Panel :header=title toggleable collapsed class="mb-3">
            <section v-for="subforum in subforums" class="grid justify-content-center">
                <ForumCard :title=subforum.title :id=subforum.id :description=subforum.description :logo=subforum.logo :key=subforum.id />
            </section>
        </Panel>
    </div>
</template>