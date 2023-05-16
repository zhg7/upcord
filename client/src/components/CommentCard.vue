<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import ProfilePicture from '@/components/ProfilePicture.vue'
import { getTimeAgo } from '@/utils/time';
import { getComment, changeComment } from '@/services/ForumService';
import { useAuth } from '@/store/auth';
import { showSuccess, showError } from '@/services/ToastService';

const auth = useAuth();

const props = defineProps({
    commentId: Number
})

const comment = ref();

const editingMode = ref(false);
const originalComment = ref("");

onMounted(async () => {
    comment.value = await getComment(Number(props.commentId));
})

function toggleEditMode() {
    editingMode.value = true;
    originalComment.value = comment.value.content; // Guardar comentario original.
}

function untoggleEditMode() {
    editingMode.value = false;
    comment.value.content = originalComment.value // Restaurar comentario original.
}

async function saveComment() {
    const result = await changeComment(comment.value.id, comment.value.content);

    if (result) {
        showSuccess('Comentario editado correctamente.', "");
        editingMode.value = false;
    } else {
        showError('Error interno', "No se podido editar el comentario.");
    }
}

</script>

<template>
    <Card>
        <template #content>
            <article class="flex flex-column">
                <section class="flex flex-row align-items-center justify-content-between gap-2">
                    <div class="flex align-items-center gap-2">
                        <ProfilePicture :image-url=comment?.author.avatar :username=comment?.author.username
                            image-size="large" />
                        <span>{{ comment?.author.username }}</span>
                    </div>
                    <div class="flex flex-column">
                        <small>{{ getTimeAgo(comment?.createdAt ?? new Date()) }}</small>
                    </div>
                </section>
                <Divider />
                <section class="post-content">
                    <p v-if="!editingMode" class="m-0">{{ comment?.content }}</p>
                    <div v-if="editingMode">
                        <Textarea v-model="comment.content" :value=comment.content autoResize rows="5" cols="30"
                            class="w-full" />
                        <small class="block mt-2">Mínimo 1 carácter.</small>
                    </div>
                </section>
            </article>
        </template>
        <template #footer>
            <section class="flex justify-content-end gap-3">
                <Button
                    v-if="(!editingMode && comment?.authorId === auth.user.value.id) || (!editingMode && auth.isAdmin.value)"
                    label="Editar" icon="pi pi-pencil" severity="warning" text aria-label="Editar comentario"
                    @click="toggleEditMode" />
                <Button v-if="editingMode" label="Cancelar" icon="pi pi-times" text severity="danger"
                    aria-label="Guardar comentario" @click="untoggleEditMode" />
                <Button v-if="editingMode" label="Guardar" icon="pi pi-save" aria-label="Guardar comentario"
                    @click="saveComment" />
            </section>
        </template>
    </Card>
</template>

<style scoped>
.post-content {
    word-break: break-all;
    white-space: pre-wrap;
}
</style>


