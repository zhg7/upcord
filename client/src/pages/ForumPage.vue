<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import Card from 'primevue/card';
import { getSubforum } from '@/services/ForumService';

const route = useRoute();
const subforum = ref();

onMounted(async () => {
    subforum.value = await getSubforum(Number(route.params.id));
})

onBeforeRouteUpdate(async (to, from) => {
    subforum.value = await getSubforum(Number(to.params.id));
})

</script>

<template>
    <Card>
        <template #title>
            <h3 class="text-start m-0">Foro de {{ subforum?.title }}</h3>
        </template>
        <template #content>
            <div class="grid">
                <section class="grid col-12 lg:col-6">

                </section>
                <section class="col-12 lg:col-6">

                </section>
            </div>
        </template>
    </Card>
</template>