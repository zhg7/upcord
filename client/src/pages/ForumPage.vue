<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, onBeforeRouteUpdate, RouterLink } from 'vue-router';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ProfilePicture from '@/components/ProfilePicture.vue'
import { getSubforum, getThreads, createThread } from '@/services/ForumService';
import { getTimeAgo } from '@/utils/time';
import { useAuth } from '@/store/auth';
import { showSuccess, showError } from '@/services/ToastService';

const route = useRoute();
const auth = useAuth();

const subforum = ref();
const threads = ref();

const creatingThread = ref(false);
const formData = {
    title: "",
    content: "",
}

onMounted(async () => {
    await updateView(Number(route.params.id))
})

onBeforeRouteUpdate(async (to, from) => {
    await updateView(Number(to.params.id))
    document.title = `Foro de ${subforum.value.title} - Upcord`

})

//Actualización de los datos al haber cambios de ruta.
async function updateView(id: number) {
    subforum.value = await getSubforum(id);
    threads.value = await getThreads(id);
}

async function addThread() {
    const result = await createThread(subforum.value.id, formData.title, formData.content)
    await handleThreadSubmission(result);
    creatingThread.value = false;
    formData.content = "";
    formData.title = "";
    updateView(subforum.value.id);
}

async function handleThreadSubmission(result: any) {
    if (result.id) { // Si se ha añadido correctamente, se recibirá la id del hilo nuevo.
        showSuccess("Hilo creado", result.title);
    } else {
        showError("Error interno", "No se ha podido crear el hilo");
    }

}

</script>

<template>
    <Card>
        <template #title>
            <h3 class="text-start m-0">Foro de {{ subforum?.title }}</h3>
        </template>
        <template #content>
            <div class="card">
                <Toast position="bottom-center" />
                <Button v-if="auth.isAuthenticated.value" @click="creatingThread = true" size="small" label="Nuevo hilo"
                    icon="pi pi-plus" />
                <DataTable :value="threads" :rows="10" paginator dataKey="id" class="mt-3">
                    <Column field="title" header="Título">
                        <template #body="{ data }">
                            <section class="flex gap-2 align-items-center flex-wrap">
                                <Tag v-if="data.isPinned" severity="success" value="📌 Fijado"></Tag>
                                <Tag v-if="data.isLocked" severity="warning" value="🔒 Cerrado"></Tag>
                                <router-link :to="`/thread/${data.id}`" class="no-underline text-white hover:underline">{{
                                    data.title }}</router-link>
                            </section>
                        </template>
                    </Column>
                    <Column header="Iniciado por" style="min-width: 14rem">
                        <template #body="{ data }">
                            <section class="flex align-items-center gap-2">
                                <ProfilePicture :image-url=data.author.avatar :username=data.author.username image-size="normal" />
                                <div class="flex flex-column gap-1">
                                    <span>{{ data.author.username }}</span>
                                    <small>{{ getTimeAgo(data.createdAt) }}</small>
                                </div>
                            </section>
                        </template>
                    </Column>
                    <Column field="replies" header="Respuestas">
                        <template #body="{ data }">
                            {{ data._count.posts - 1 }} <!-- no tener en cuenta el primer comentario del autor -->
                        </template>
                    </Column>
                    <Column field="last-reply" header="Última respuesta">
                        <template #body="{ data }">
                            <section v-if="data.posts[0] && data.posts[0].author.username !== data.author.username"
                                class="flex align-items-center gap-2">
                                <!-- no tener en cuenta el autor del primer mensaje -->
                                <ProfilePicture :image-url=data.posts[0].author.avatar
                                    :username=data.posts[0].author.username image-size="normal" />
                                <div class="flex flex-column gap-1">
                                    <span>{{ data.posts[0].author.username }}</span>
                                    <small>{{ getTimeAgo(data.posts[0].createdAt) }}</small>
                                </div>
                            </section>
                            <div v-else>
                                -
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>
    </Card>

    <Dialog v-model:visible="creatingThread" modal header="Creación de hilo" :style="{ width: '75vw' }">
        <form class="flex flex-column gap-3">
            <label for="thread-title">Título</label>
            <InputText id="thread-title" type="text" v-model="formData.title" />
            <label for="thread-content">Contenido</label>
            <Textarea id="thread-content" v-model="formData.content" rows="7" />
        </form>
        <template #footer>
            <Button label="Cancelar" severity="danger" icon="pi pi-times" @click="creatingThread = false" text />
            <Button label="Crear hilo" icon="pi pi-check" autofocus @click="addThread()" />
        </template>
    </Dialog>
</template>

