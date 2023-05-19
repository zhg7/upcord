<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ForumCard from './ForumCard.vue';
import type { Subforum } from '@/types/Forum'

defineProps({
    title: String,
    subforums: Array<Subforum>
})

</script>

<template>
    <div class="card">
        <Accordion :multiple="true">
            <AccordionTab :header="title">
                <section v-for="subforum in subforums" class="grid justify-content-center">
                    <ForumCard :title=subforum.title :id=subforum.id :description=subforum.description :logo=subforum.logo
                        :key=subforum.id />
                </section>
            </AccordionTab>
        </Accordion>
    </div>
</template>