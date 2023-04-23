<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Menubar from 'primevue/menubar';
import { ref, computed } from "vue";
import { useAuth } from '@/store/auth';

const auth = useAuth();

const items = ref([
    {
        label: 'Foros',
        icon: 'pi pi-fw pi-comments'
    },
    {
        label: 'Chats',
        icon: 'pi pi-fw pi-envelope',
        visible: auth.isAuthenticated
    },
    {
        label: 'Iniciar sesión',
        icon: 'pi pi-fw pi-sign-in',
        to: "login",
        separator: auth.isAuthenticated
    },
    {
        label: 'Crear cuenta',
        icon: 'pi pi-fw pi-user-plus',
        to: "signup",
        separator: auth.isAuthenticated
    },
    {
        label: auth.user.value?.username,
        visible: auth.isAuthenticated,
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'Perfil',
                icon: 'pi pi-fw pi-id-card'
            },
            {
                label: 'Ajustes',
                icon: 'pi pi-fw pi-cog'
            },
            {
                separator: true
            },
            {
                label: 'Cerrar sesión',
                icon: 'pi pi-fw pi-power-off'
            },
        ]
    },
]);

</script>

<template>
    <nav>
        <Menubar :model="items" class="mb-2">
            <template #start>
                <router-link to="/"><img alt="logo" src="@/assets/images/upcord-logo-dark.svg" height="40"
                        class="mr-2" /></router-link>
            </template>
        </Menubar>
    </nav>
</template>