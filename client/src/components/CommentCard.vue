<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Button from 'primevue/button';
import ProfilePicture from '@/components/ProfilePicture.vue'
import { getTimeAgo } from '@/utils/time';
import { getComment } from '@/services/ForumService';
import { useAuth } from '@/store/auth';

const auth = useAuth();

const props = defineProps({
    commentId: Number
})

const comment = ref();

onMounted(async () => {
    comment.value = await getComment(Number(props.commentId));
})

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
                    <p class="m-0">{{ comment?.content }}</p>
                </section>
            </article>
        </template>
    </Card>
</template>

<style scoped>
.post-content {
    word-break: break-all;
}
</style>


