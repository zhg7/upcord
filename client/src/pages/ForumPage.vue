<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ThreadCard from '@/components/ThreadCard.vue';
import ProfilePicture from '@/components/ProfilePicture.vue'
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
            <div class="card">
                <DataTable :value="threads" tableStyle="min-width: 50rem">
                    <Column field="title" header="Título" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.title }}
                        </template>
                    </Column>
                    <Column header="Iniciado por" style="min-width: 14rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <ProfilePicture :image-url=data.author.avatar :username=data.author.username />
                                <span>{{ data.author.username }}</span>
                            </div>
                        </template>
                        <template #filter="{ filterModel }">
                        </template>
                    </Column>
                    <Column field="title" header="Respuestas" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data._count.posts }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>
    </Card>
</template>