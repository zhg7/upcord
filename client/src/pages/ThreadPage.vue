<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, onBeforeRouteUpdate, RouterLink } from 'vue-router';
import Breadcrumb from 'primevue/breadcrumb';
import { getThread } from '@/services/ForumService';

const route = useRoute();

const thread = ref();
const comments = ref();

const breadcrumbItems = ref([{ label: "Inicio", to: "/" }]);

onMounted(async () => {
    thread.value = await getThread(Number(route.params.id));

    breadcrumbItems.value.push(
        { label: thread.value.subforum.title, to: `/forum/${thread.value.subforum.id}` },  
    )
    breadcrumbItems.value.push(
        { label: thread.value.title, to: `#` },  
    )

})

</script>

<template>
    <div class="card flex justify-content-center">
        <Breadcrumb :model="breadcrumbItems" />
    </div>
</template>