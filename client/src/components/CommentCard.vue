<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Skeleton from 'primevue/skeleton';
import ProfilePicture from '@/components/ProfilePicture.vue'
import useVuelidator from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { getTimeAgo, formatDate } from '@/utils/time';
import { getComment, changeComment, createReply, getReplies, createLike, deleteLike } from '@/services/ForumService';
import { useAuth } from '@/store/auth';
import { showSuccess, showError } from '@/services/ToastService';
import type { Author } from '@/types/Author';

const auth = useAuth();

const props = defineProps({
    commentId: Number
})

const comment = ref();
const replies = ref();
const isLoading = ref(true);

const editingMode = ref(false);
const replyingMode = ref(false);

const newComment = ref({
    comment: ""
})

const rules = {
    comment: { required: required, minLength: minLength(1) }
};

const editedComment = ref({
    comment: "",
});

const v$ = useVuelidator(rules, editedComment, { $stopPropagation: true });
const v_new$ = useVuelidator(rules, newComment, { $stopPropagation: true });

onMounted(async () => {
    comment.value = await getComment(Number(props.commentId));
    replies.value = await getReplies(Number(props.commentId));
    isLoading.value = false;
})

function toggleEditMode() {
    editedComment.value.comment = comment.value.content;
    editingMode.value = true;
}

async function saveComment() {

    const validationPassed = await v$.value.$validate();

    if (validationPassed) {
        const result = await changeComment(comment.value.id, editedComment.value.comment);
        if (result) {
            showSuccess('Comentario editado correctamente.', "");
            comment.value.content = editedComment.value.comment;
            editingMode.value = false;
        } else {
            showError('Error interno', "No se podido editar el comentario.");
        }
    }

}

async function addReply() {

    const validationPassed = await v_new$.value.$validate();

    if (validationPassed) {
        const result = await createReply(comment.value.threadId, newComment.value.comment, comment.value.id);
        if (result) {
            showSuccess('Respuesta añadida', "");
            replyingMode.value = false;
            replies.value = await getReplies(Number(props.commentId));
        } else {
            showError('Error interno', "No se podido añadir la respuesta.");
        }
    }

}


// Poner y quitar me gusta
async function handleLike() {
    if (!commentLiked.value) {
        await createLike(comment.value.id, auth.user.value.id);
    } else {
        await deleteLike(comment.value.id, auth.user.value.id);
    }
    comment.value = await getComment(Number(props.commentId));
}


// Verificar si el usuario logeado ha dado me gusta.
const commentLiked = computed(() => {
    return comment.value?.likes.some((author: Author) => author.authorId === auth.user.value.id);
})

</script>

<template>
    <Card class="border-round border-1 surface-border">
        <template #content>
            <article class="flex flex-column">
                <section class="flex flex-row align-items-center justify-content-between gap-2">
                    <div class="flex align-items-center gap-2">
                        <Skeleton v-if="isLoading" shape="circle" size="3rem" class="mr-2"></Skeleton>
                        <ProfilePicture v-else :image-url=comment?.author.avatar :username=comment?.author.username
                            image-size="large" />
                        <Skeleton v-if="isLoading" width="7rem" class="mb-2"></Skeleton>
                        <span v-else>{{ comment?.author.username }}</span>
                    </div>
                    <div class="flex flex-column">
                        <Skeleton v-if="isLoading" width="7rem" class="mb-2"></Skeleton>
                        <span v-else v-tooltip.top="formatDate(comment?.createdAt ?? new Date())">{{ getTimeAgo(comment?.createdAt
                            ?? new Date()) }}</span>
                    </div>
                </section>
                <Divider />
                <section class="post-content">
                    <div v-if="isLoading">
                        <Skeleton class="mb-2"></Skeleton>
                        <Skeleton class="mb-3"></Skeleton>
                        <Skeleton class="mb-2"></Skeleton>
                        <Skeleton class="mb-2"></Skeleton>
                    </div>
                    <p v-else v-if="!editingMode" class="m-0">{{ comment?.content }}</p>
                    <div v-if="editingMode">
                        <Textarea v-model="editedComment.comment" autoResize rows="5" cols="30" class="w-full"
                            :class="{ 'p-invalid': v$.comment.$errors.length }" />
                        <small class="block mt-2">Mínimo 1 carácter.</small>
                    </div>
                </section>
            </article>
        </template>
        <template #footer>
            <section v-if="auth.isAuthenticated.value" class="flex justify-content-end align-items-center gap-3">
                <Button
                    v-if="(!editingMode && comment?.authorId === auth.user?.value?.id && !replyingMode) || (!editingMode && auth.isAdmin?.value && !replyingMode)"
                    label="Editar" icon="pi pi-pencil" severity="warning" text aria-label="Editar comentario"
                    @click="toggleEditMode" />
                <Button v-if="editingMode" label="Cancelar" icon="pi pi-times" text severity="danger"
                    aria-label="Guardar comentario" @click="editingMode = false" />
                <Button v-if="editingMode" label="Guardar" icon="pi pi-save" aria-label="Guardar comentario"
                    @click="saveComment" />

                <Button v-if="!comment?.thread.isLocked && !editingMode && !replyingMode" label="Responder"
                    icon="pi pi-reply" severity="help" text aria-label="Responder comentario"
                    @click="replyingMode = true"></Button>

                <Button text class="flex gap-2" severity="danger" @click="handleLike()">
                    <i class="pi" :class="{ 'pi-heart-fill': commentLiked, 'pi-heart': !commentLiked }"></i>
                    <span>{{ comment?._count.likes }}</span>
                </Button>

            </section>
            <section v-if="replyingMode" class="mt-3">
                <Textarea v-model="newComment.comment" autoResize rows="5" cols="30" class="w-full"
                    :class="{ 'p-invalid': v_new$.comment.$errors.length }" />
                <small class="block mt-2">Mínimo 1 carácter.</small>
                <div class="mt-5 flex justify-content-end align-items-end">
                    <Button label="Cancelar" icon="pi pi-times" text severity="danger" aria-label="Guardar comentario"
                        @click="replyingMode = false" />
                    <Button label="Responder" icon="pi pi-reply" aria-label="Guardar comentario" @click="addReply" />
                </div>
            </section>
            <Accordion v-if="replies?.length" :multiple="true" class="mt-4">
                <AccordionTab header="Respuestas">
                    <section v-for="reply in replies" :key="reply.id" class="mb-3">
                        <CommentCard :commentId="reply.id" />
                    </section>
                </AccordionTab>
            </Accordion>
        </template>
    </Card>
</template>

<style scoped>
.post-content {
    word-break: break-all;
    white-space: pre-wrap;
}
</style>


