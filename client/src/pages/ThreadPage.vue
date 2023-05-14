<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from 'primevue/breadcrumb';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import CommentCard from '@/components/CommentCard.vue';
import { getThread, getComments, createComment } from '@/services/ForumService';
import { showSuccess, showError } from '@/services/ToastService';

const route = useRoute();

const thread = ref();
const comments = ref();

const newComment = ref("");

const breadcrumbItems = ref([{ label: "Inicio", to: "/" }]);

onMounted(async () => {
    thread.value = await getThread(Number(route.params.id));
    comments.value = await getComments(Number(route.params.id));

    breadcrumbItems.value.push(
        { label: thread.value.subforum.title, to: `/forum/${thread.value.subforum.id}` },
    )
    breadcrumbItems.value.push(
        { label: thread.value.title, to: `#` },
    )

})

async function addComment() {
    const result = await createComment(thread.value.id, newComment.value);
    await handleCommentSubmission(result);
    newComment.value = "";
    comments.value = await getComments(Number(route.params.id));
}

async function handleCommentSubmission(result: any) {
    if (result.id) {
        showSuccess("Comentario añadido", "");
    } else {
        showError("Error interno", "No se ha podido añadir el comentario");
    }

}

</script>

<template>
    <div class="card flex justify-content-center flex-column gap-3">
        <Toast position="bottom-center" />
        <Breadcrumb :model="breadcrumbItems" />
        <section v-for="comment in comments" :key="comment.id">
            <CommentCard :commentId="comment.id" />
        </section>
        <Card>
            <template #content>
                <section>
                    <Textarea v-model="newComment" autoResize rows="5" cols="30" class="w-full" />
                </section>
            </template>
            <template #footer>
                <Button label="Responder" icon="pi pi-reply" @click="addComment()" />
            </template>
        </Card>
    </div>
</template>