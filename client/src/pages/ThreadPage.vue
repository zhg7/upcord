<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink, type RouteLocationRaw } from 'vue-router';
import Breadcrumb from 'primevue/breadcrumb';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ScrollTop from 'primevue/scrolltop';
import Divider from 'primevue/divider';
import InputSwitch from 'primevue/inputswitch';
import Dropdown from 'primevue/dropdown';
import useVuelidator from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import CommentCard from '@/components/CommentCard.vue';
import { getThread, getComments, createComment, getCategories, changeThread } from '@/services/ForumService';
import { showSuccess, showError } from '@/services/ToastService';
import { useAuth } from '@/store/auth';
import type { Category, Subforum } from '@/types/Forum'

const auth = useAuth();
const route = useRoute();

const thread = ref();
const comments = ref();

const editingThread = ref(false);

const formData = ref({
    title: "",
    isLocked: false,
    isPinned: false,
    subforumId: 0
})

const subforums = ref<Subforum[]>([]);

const newComment = ref({
    comment: "",
});

const rules = {
    comment: { required: required, minLength: minLength(1) }
};

const threadRules = {
    title: { required: required, minLength: minLength(1), maxLength: maxLength(170) }
}

const v$ = useVuelidator(rules, newComment);

const v_thread$ = useVuelidator(threadRules, formData);

const breadcrumbItems = ref([{ label: "Inicio", to: "/" }]);

onMounted(async () => {
    thread.value = await getThread(Number(route.params.id));
    comments.value = await getComments(Number(route.params.id));

    // Mostrar subforo y título del hilo
    breadcrumbItems.value.push(
        { label: thread.value.subforum.title, to: `/forum/${thread.value.subforum.id}` },
    )
    breadcrumbItems.value.push(
        { label: thread.value.title, to: `#` },
    )

    setSubforumValues();
    setEditModalDetails();

})

// Cargar lista de subforos para mover el hilo.
async function setSubforumValues() {
    const categories: Array<Category> = await getCategories();
    categories.forEach(category => {
        const forums: Array<Subforum> = category.subforums;
        forums.forEach(forum => {
            subforums.value?.push(forum);
        })
    })
}


// Cargar configuraciones actuales del hilo.
function setEditModalDetails() {
    formData.value.title = thread.value.title;
    formData.value.isLocked = thread.value.isLocked;
    formData.value.isPinned = thread.value.isPinned;
    formData.value.subforumId = thread.value.subforumId;
}

async function addComment() {
    const validationPassed = await v$.value.$validate();

    if (validationPassed) {
        const result = await createComment(thread.value.id, newComment.value.comment);
        await handleCommentSubmission(result);
    }

}

async function handleCommentSubmission(result: any) {
    if (result.id) {
        showSuccess("Comentario añadido correctamente", "");
        newComment.value.comment = "";
        comments.value = await getComments(Number(route.params.id));
        v$.value.$reset();
    } else {
        showError("Error interno", "No se ha podido añadir el comentario");
    }
}

async function saveThread() {
    const validationPassed = await v_thread$.value.$validate();

    if (validationPassed) {
        const result = await changeThread(formData.value.title, formData.value.isLocked, formData.value.isPinned, formData.value.subforumId, thread.value.id);
        await handleThreadUpdate(result);
    }

}

async function handleThreadUpdate(result: any) {
    if (result.id) {
        showSuccess("Hilo editado correctamente", "");
        editingThread.value = false;
        thread.value = await getThread(Number(route.params.id));
        // Forzar rerenderizado de los comentarios.
        comments.value = null;
        comments.value = await getComments(Number(route.params.id));
        breadcrumbItems.value[1].label = thread.value.subforum.title;
        breadcrumbItems.value[2].label = thread.value.title;
    } else {
        showError("Error interno", "No se ha podido editar el hilo");
    }
}

</script>

<template>
    <div class="card flex justify-content-center flex-column gap-3">
        <ScrollTop />
        <Toast position="bottom-center" />
        <Breadcrumb :model="breadcrumbItems">
            <template #item="{ item }">
                <div class="flex align-items-center flex-wrap gap-2">
                    <section v-if="item.label?.toString() === thread?.title" class="flex gap-2">
                        <Button v-if="thread.authorId === auth.user.value.id || auth.isAdmin.value" icon="pi pi-cog" size="large" class="m-0 p-0"
                            @click="editingThread = true; setEditModalDetails()" />
                        <Tag v-if="thread?.isPinned" severity="success" value="📌 Fijado"></Tag>
                        <Tag v-if="thread?.isLocked" severity="warning" value="🔒 Cerrado"></Tag>
                    </section>
                    <router-link class="no-underline hover:underline text-white" :to="(item.to as RouteLocationRaw)">{{
                        item.label }}</router-link>
                </div>
            </template>
        </Breadcrumb>
        <section v-for="comment in comments" :key="comment.id">
            <CommentCard :commentId="comment.id" />
        </section>
        <Card v-if="auth.isAuthenticated.value && !thread?.isLocked">
            <template #content>
                <section>
                    <Textarea v-model="newComment.comment" autoResize rows="5" cols="30" class="w-full"
                        :class="{ 'p-invalid': v$.comment.$errors.length }" />
                    <small class="block mt-2">Mínimo 1 carácter.</small>
                </section>
            </template>
            <template #footer>
                <Button label="Responder" icon="pi pi-reply" @click="addComment" />
            </template>
        </Card>
    </div>

    <!-- Modal edición hilo -->
    <Dialog v-model:visible="editingThread" modal header="Edición de hilo" :style="{ width: '75vw' }">
        <form class="flex flex-column gap-3">
            <label for="thread-title">Título</label>
            <InputText id="thread-title" type="text" v-model="formData.title" :class="{ 'p-invalid': v_thread$.title.$errors.length }"/>
            <small class="block">Entre 1 y 170 carácteres.</small>
            <section v-if="auth.isAdmin.value" class="flex flex-column  gap-5">
                <Divider />
                <div class="flex flex-row gap-3">
                    <div class="flex align-items-center gap-2">
                        <label for="toggle-lock">Cerrado</label>
                        <InputSwitch id="toggle-lock" v-model="formData.isLocked" />
                    </div>
                    <div class="flex align-items-center gap-2">
                        <label for="toggle-pin">Fijado</label>
                        <InputSwitch id="toggle-pin" v-model="formData.isPinned" />
                    </div>
                </div>
                <div class="flex align-items-center gap-2">
                    <label for="move-thread">Mover a</label>
                    <Dropdown id="move-thread" v-model="formData.subforumId" :options="subforums" optionLabel="title"
                        optionValue="id" class="w-full md:w-14rem" />
                </div>

            </section>

        </form>
        <template #footer>
            <Button label="Cancelar" severity="danger" icon="pi pi-times" @click="editingThread = false" text />
            <Button label="Guardar" icon="pi pi-check" autofocus @click="saveThread()" />
        </template>
    </Dialog>
</template>