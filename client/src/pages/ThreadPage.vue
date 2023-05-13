<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from 'primevue/breadcrumb';
import CommentCard from '@/components/CommentCard.vue';
import { getThread, getComments } from '@/services/ForumService';

const route = useRoute();

const thread = ref();
const comments = ref();

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

</script>

<template>
    <div class="card flex justify-content-center flex-column gap-3">
        <Breadcrumb :model="breadcrumbItems" />
        <section v-for="comment in comments">
            <CommentCard :commentId="comment.id" />
        </section>
    </div>
</template>