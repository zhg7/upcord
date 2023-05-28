<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate, RouterLink } from 'vue-router';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import Avatar from 'primevue/avatar';
import useVuelidator from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import ProfilePicture from '@/components/ProfilePicture.vue'
import { getSubforum, getThreads, createThread, changeSubforum } from '@/services/ForumService';
import { getTimeAgo, formatDate } from '@/utils/time';
import { useAuth } from '@/store/auth';
import { showSuccess, showError } from '@/services/ToastService';
import { FilterMatchMode } from 'primevue/api';

const route = useRoute();
const router = useRouter();
const auth = useAuth();

const subforum = ref();
const threads = ref();

const creatingThread = ref(false);
const editingForum = ref(false);

const newThreadFormData = ref({
    title: "",
    content: "",
})

const forumFormData = ref({
    title: "",
    description: "",
})

const threadRules = {
    title: { required: required, minLength: minLength(1), maxLength: maxLength(170) },
    content: { required: required, minLength: minLength(1) },
};

const forumRules = {
    title: { required: required, minLength: minLength(1), maxLength: maxLength(64) },
    description: { maxLength: maxLength(170) },
}

const v_thread$ = useVuelidator(threadRules, newThreadFormData);
const v_forum$ = useVuelidator(forumRules, forumFormData);

onMounted(async () => {
    await updateView(Number(route.params.id))
})

onBeforeRouteUpdate(async (to, from) => {
    await updateView(Number(to.params.id))
    document.title = `Foro de ${subforum.value.title} - Upcord`

})

// Datatable
const filters = ref({
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'author.username': { value: null, matchMode: FilterMatchMode.CONTAINS }

});

//Actualización de los datos al haber cambios de ruta.
async function updateView(id: number) {
    subforum.value = await getSubforum(id);
    threads.value = await getThreads(id);
    setEditModalDetails();
}

async function addThread() {
    const validationPassed = await v_thread$.value.$validate();

    if (validationPassed) {
        const result = await createThread(subforum.value.id, newThreadFormData.value.title, newThreadFormData.value.content)
        await handleThreadSubmission(result);
        creatingThread.value = false;
        newThreadFormData.value.content = "";
        newThreadFormData.value.title = "";
        updateView(subforum.value.id);
    }
}

async function handleThreadSubmission(result: any) {
    if (result.id) { // Si se ha añadido correctamente, se recibirá la id del hilo nuevo.
        showSuccess("Hilo creado", result.title);
        setTimeout(() => { // Redirigir tras creación exitosa.
            router.push(`/thread/${result.id}`);
        }, 800);
    } else {
        showError("Error interno", "No se ha podido crear el hilo");
    }

}

// Cargar configuraciones actuales del foro.
function setEditModalDetails() {
    forumFormData.value.title = subforum.value.title;
    forumFormData.value.description = subforum.value.description;
}

async function saveSubforum() {
    const validationPassed = await v_forum$.value.$validate();

    if (validationPassed) {
        await changeSubforum(subforum.value.id, forumFormData.value.title, forumFormData.value.description);
        showSuccess("Foro editado correctamente", "");
        editingForum.value = false;
        await updateView(Number(route.params.id));
    }
}

</script>

<template>
    <Card>
        <template #title>
            <section class="flex align-items-center gap-2">
                <Avatar v-if="subforum?.logo" :image=subforum.logo />
                <h3 class="text-start m-0">Foro de {{ subforum?.title }}</h3>
            </section>
        </template>
        <template #content>
            <div class="card">
                <p class="description">{{ subforum?.description }}</p>
                <Toast position="bottom-center" />
                <section class="flex gap-3">
                    <Button v-if="auth.isAuthenticated.value" @click="creatingThread = true" label="Nuevo hilo"
                        icon="pi pi-plus" />
                    <Button v-if="auth.isAdmin.value" @click="editingForum = true" label="Ajustes" icon="pi pi-cog" />
                </section>
                <DataTable :value="threads" :rows="10" paginator filterDisplay="row" v-model:filters="filters"
                    sortMode="multiple" removableSort dataKey="id" class="mt-3">
                    <template #empty> No se han encontrado hilos. </template>
                    <Column field="title" header="Título" sortable :show-filter-menu="false" class="max-w-20rem">
                        <template #body="{ data }">
                            <section class="flex gap-2 align-items-center flex-wrap">
                                <Tag v-if="data.isPinned" severity="success" class="text-black-alpha-90" value="📌 Fijado">
                                </Tag>
                                <Tag v-if="data.isLocked" severity="warning" value="🔒 Cerrado"></Tag>
                                <router-link :to="`/thread/${data.id}`" class="no-underline text-color hover:underline">{{
                                    data.title }}</router-link>
                            </section>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                    class="p-column-filter" placeholder="Buscar por título" />
                            </span>
                        </template>
                    </Column>
                    <Column filterField="author.username" header="Iniciado por" :show-filter-menu="false"
                        class="min-w-20rem">
                        <template #body="{ data }">
                            <section class="flex align-items-center gap-2">
                                <ProfilePicture :image-url=data.author.avatar :username=data.author.username
                                    image-size="normal" />
                                <div class="flex flex-column gap-1">
                                    <span>{{ data.author.username }}</span>
                                    <small v-tooltip.top="formatDate(data.createdAt)">{{ getTimeAgo(data.createdAt)
                                    }}</small>
                                </div>
                            </section>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                    class="p-column-filter" placeholder="Buscar por autor" />
                            </span>
                        </template>
                    </Column>
                    <Column field="_count.posts" sortable header="Respuestas">
                        <template #body="{ data }">
                            {{ data._count.posts }}
                        </template>
                    </Column>
                    <Column field="updatedAt" sortable header="Última actividad">
                        <template #body="{ data }">
                            <section class="flex align-items-center gap-2">
                                <ProfilePicture :image-url=data.posts[0].author.avatar
                                    :username=data.posts[0].author.username image-size="normal" />
                                <div class="flex flex-column gap-1">
                                    <span>{{ data.posts[0].author.username }}</span>
                                    <small v-tooltip.top="formatDate(data.posts[0].createdAt)">{{
                                        getTimeAgo(data.posts[0].createdAt) }}</small>
                                </div>
                            </section>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>
    </Card>

    <!-- Modal creación hilo -->
    <Dialog v-model:visible="creatingThread" modal header="Creación de hilo" :style="{ width: '75vw' }">
        <form class="flex flex-column gap-3">
            <label for="thread-title">Título</label>
            <InputText id="thread-title" type="text" v-model="newThreadFormData.title"
                :class="{ 'p-invalid': v_thread$.title.$errors.length }" />
            <small class="block">Entre 1 y 170 carácteres.</small>
            <label for="thread-content">Contenido</label>
            <Textarea id="thread-content" v-model="newThreadFormData.content" rows="7"
                :class="{ 'p-invalid': v_thread$.content.$errors.length }" />
            <small class="block">Mínimo 1 cáracter.</small>
        </form>
        <template #footer>
            <Button label="Cancelar" severity="danger" icon="pi pi-times" @click="creatingThread = false" text />
            <Button label="Crear hilo" icon="pi pi-check" autofocus @click="addThread()" />
        </template>
    </Dialog>

    <!-- Modal edición foro -->
    <Dialog v-model:visible="editingForum" modal header="Edición de foro" :style="{ width: '75vw' }">
        <form class="flex flex-column gap-3">
            <label for="forum-title">Título</label>
            <InputText id="forum-title" type="text" v-model="forumFormData.title"
                :class="{ 'p-invalid': v_forum$.title.$errors.length }" />
            <small class="block">Entre 1 y 64 carácteres.</small>
            <label for="forum-description">Descripción</label>
            <Textarea id="forum-description" v-model="forumFormData.description" rows="7"
                :class="{ 'p-invalid': v_forum$.description.$errors.length }" />
            <small class="block">Máximo 170 carácteres.</small>
        </form>
        <template #footer>
            <Button label="Cancelar" severity="danger" icon="pi pi-times" @click="editingForum = false" text />
            <Button label="Guardar" icon="pi pi-check" autofocus @click="saveSubforum()" />
        </template>
    </Dialog>
</template>

<style scoped>
.description {
    word-break: break-all;
    white-space: pre-wrap;
}
</style>


