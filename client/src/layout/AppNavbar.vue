<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Menubar from 'primevue/menubar';
import { ref } from "vue";
import { useAuth } from '@/store/auth';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

const items = ref([
    {
        label: 'Foros',
        icon: 'pi pi-fw pi-comments'
    },
    {
        label: 'Chats',
        icon: 'pi pi-fw pi-envelope',
        visible: auth.isAuthenticated,
        to: "/chats"
    },
    {
        label: 'Iniciar sesión',
        icon: 'pi pi-fw pi-sign-in',
        to: "/login",
        separator: auth.isAuthenticated
    },
    {
        label: 'Crear cuenta',
        icon: 'pi pi-fw pi-user-plus',
        to: "/signup",
        separator: auth.isAuthenticated
    },
    {
        label: auth.user.value?.username,
        visible: auth.isAuthenticated,
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'Perfil',
                icon: 'pi pi-fw pi-id-card',
                to: `/profile/${auth.user.value?.username}`,
            },
            {
                label: 'Ajustes',
                icon: 'pi pi-fw pi-cog',
                to: "/settings"
            },
            {
                separator: true
            },
            {
                label: 'Cerrar sesión',
                icon: 'pi pi-fw pi-power-off',
                command: () => {
                    auth.logout();
                    router.push({ path: "/" });
                },
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