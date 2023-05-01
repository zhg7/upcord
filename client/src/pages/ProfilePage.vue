<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Card from 'primevue/card';
import ProfilePicture from '@/components/ProfilePicture.vue';
import { useAuth } from '@/store/auth';
import { getUserDetails } from '@/services/UserService';

const route = useRoute();
const auth = useAuth();
const user: any = ref({});

onMounted(async () => {
    user.value = await getUserDetails(route.params.username as string);
})

</script>

<template>
    <Card>
        <template #content>
            <section class="flex gap-3">
                <ProfilePicture :image-url="user.avatar" :username="user.username" />
                <h1>{{ user.username }}</h1>
                <h2>{{ user.createdAt }}</h2>
                <p>{{ user.biography }}</p>
            </section>
        </template>
    </Card>
</template>