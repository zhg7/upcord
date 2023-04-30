<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Avatar from 'primevue/avatar';
import { checkUsernameAvailability } from '@/services/UserService';
import router from '@/router';
import { useAuth } from '@/store/auth';

const route = useRoute();
const auth = useAuth();

// Comprobar que existe el nombre de usuario del perfil
onBeforeMount(async () => {
    const username = route.params.username as string ?? auth.user.value.username; // Usar el nombre de usuario de la sesión.
    try {
        if (!await checkUsernameAvailability(username)) {
            router.push({ name: "notfound" });
        }
    } catch {
        router.push({ name: "notfound" });
    }
})


</script>

<template>
    <h1>test</h1>
</template>