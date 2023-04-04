<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Menubar from 'primevue/menubar';

import { ref } from "vue";

const items = ref([
    {
        label: 'Foros',
        icon: 'pi pi-fw pi-comments'
    },
    {
        label: 'Chats',
        icon: 'pi pi-fw pi-envelope'
    },
    {
        label: 'Iniciar sesión',
        icon: 'pi pi-fw pi-sign-in',
        to: "login"
    },
    {
        label: 'Crear cuenta',
        icon: 'pi pi-fw pi-user-plus',
        to: "signup"
    },
]);

</script>

<template>
    <nav>
        <Menubar :model="items" class="mb-2">
            <template #start>
                <router-link to="/"><img alt="logo" src="@/assets/images/upcord-logo-dark.svg" height="40" class="mr-2" /></router-link>
            </template>
        </Menubar>
    </nav>
</template>