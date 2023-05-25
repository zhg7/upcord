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
import useVuelidator from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import ProfilePicture from '@/components/ProfilePicture.vue'
import { getSubforum, getThreads, createThread } from '@/services/ForumService';
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
const formData = ref({
    title: "",
    content: "",
})

const rules = {
    title: { required: required, minLength: minLength(1), maxLength: maxLength(170) },
    content: { required: required, minLength: minLength(1) },
};

const v$ = useVuelidator(rules, formData);

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
}

async function addThread() {
    const validationPassed = await v$.value.$validate();

    if (validationPassed) {
        const result = await createThread(subforum.value.id, formData.value.title, formData.value.content)
        await handleThreadSubmission(result);
        creatingThread.value = false;
        formData.value.content = "";
        formData.value.title = "";
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
                <DataTable :value="threads" :rows="10" paginator filterDisplay="row" v-model:filters="filters" sortMode="multiple" removableSort dataKey="id" class="mt-3">
                    <template #empty> No se han encontrado hilos. </template>
                    <Column field="title" header="Título" sortable :show-filter-menu="false">
                        <template #body="{ data }">
                            <section class="flex gap-2 align-items-center flex-wrap">
                                <Tag v-if="data.isPinned" severity="success" class="text-black-alpha-90" value="📌 Fijado"></Tag>
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
                        style="min-width: 14rem">
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
            <InputText id="thread-title" type="text" v-model="formData.title"
                :class="{ 'p-invalid': v$.title.$errors.length }" />
            <small class="block">Entre 1 y 170 carácteres.</small>
            <label for="thread-content">Contenido</label>
            <Textarea id="thread-content" v-model="formData.content" rows="7"
                :class="{ 'p-invalid': v$.content.$errors.length }" />
            <small class="block">Mínimo 1 cáracter.</small>
        </form>
        <template #footer>
            <Button label="Cancelar" severity="danger" icon="pi pi-times" @click="creatingThread = false" text />
            <Button label="Crear hilo" icon="pi pi-check" autofocus @click="addThread()" />
        </template>
    </Dialog>
</template>

