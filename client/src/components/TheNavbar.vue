<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Menubar from 'primevue/menubar';

import { ref } from "vue";

const items = ref([
    {
        label: 'Foros',
        icon: 'pi pi-fw pi-comments'
    },
    {
        label: 'Iniciar sesión',
        icon: 'pi pi-fw pi-sign-in',
        to: "login"
    },
    {
        label: 'Crear cuenta',
        icon: 'pi pi-fw pi-user-plus'
    },
]);

</script>

<template>
    <nav>
        <Menubar :model="items" class="mb-2">
            <template #start>
                <router-link to="/"><img alt="logo" src="@/assets/upcord-logo-dark.svg" height="40" class="mr-2" /></router-link>
            </template>
        </Menubar>
    </nav>
</template>