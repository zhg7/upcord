<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import Card from 'primevue/card';
import { getSubforum, getThreads } from '@/services/ForumService';

const route = useRoute();

const subforum = ref();
const threads = ref();

onMounted(async () => {
    await updateView(Number(route.params.id))
})

onBeforeRouteUpdate(async (to, from) => {
    await updateView(Number(to.params.id))
})

//Actualización de los datos al haber cambios de ruta.
async function updateView(id: number) {
    subforum.value = await getSubforum(id);
    threads.value = await getThreads(id);
}

</script>

<template>
    <Card>
        <template #title>
            <h3 class="text-start m-0">Foro de {{ subforum?.title }}</h3>
        </template>
        <template #content>
            <div class="grid">
                <section class="grid col-12 lg:col-6">
                    <div v-for="thread in threads">
                        <span>{{ thread }}</span>
                    </div>
                </section>
                <section class="col-12 lg:col-6">

                </section>
            </div>
        </template>
    </Card>
</template>