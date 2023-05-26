<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Menubar from 'primevue/menubar';
import { ref, onMounted } from "vue";
import { useAuth } from '@/store/auth';
import { useRouter } from 'vue-router';
import { getCategories } from '@/services/ForumService';
import ThemeToggler from '@/components/ThemeToggler.vue';
import { useDark } from '@vueuse/core';
import type { MenuItem } from 'primevue/menuitem';
import type { Category } from '@/types/Forum'

const isDark = useDark();
const auth = useAuth();
const router = useRouter();

const categories = ref<Category[]>();

onMounted(async () => {
    categories.value = await getCategories();
    populateForumList();
})

function populateForumList() {
    categories.value?.forEach((category, index) => { // @ts-ignore - Problema de PrimeVue.
        items.value[0].items?.push({
            label: category.title,
            items: []
        });

        category.subforums.forEach(subforum => { // @ts-ignore - Problema de PrimeVue.
            items.value[0].items[index].items.push({
                label: subforum.title,
                to: `/forum/${subforum.id}`,
            })
        })
    });
}

const items = ref([
    {
        label: 'Foros',
        icon: 'pi pi-fw pi-comments',
        key: "forums",
        items: [] as Array<MenuItem>
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
                label: 'Usuarios',
                icon: 'pi pi-fw pi-users',
                to: `/user-manager`,
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
                <router-link v-if="isDark" to="/"><img alt="logo" src="@/assets/images/upcord-logo-dark.svg" height="40"
                        class="mr-2" /></router-link>
                <router-link v-else to="/"><img alt="logo" src="@/assets/images/upcord-logo-light.svg" height="40"
                        class="mr-2" /></router-link>
            </template>
            <template #end>
                <ThemeToggler />
            </template>
        </Menubar>
    </nav>
</template>