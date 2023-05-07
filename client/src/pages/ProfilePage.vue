<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import Card from 'primevue/card';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import ProfilePicture from '@/components/ProfilePicture.vue';
import { useAuth } from '@/store/auth';
import { getUserDetails } from '@/services/UserService';
import { getTimeAgo } from '@/utils/time';

const route = useRoute();
const auth = useAuth();

const user: any = ref({});

onMounted(async () => {
    await updateView(route.params.username as string);
})

onBeforeRouteUpdate(async (to, from) => {
    await updateView(to.params.username as string);
})

async function updateView(username: string) {
    user.value = await getUserDetails(username);
}

const isOwnProfile = computed(() => {
    return auth.user.value.id === user.value.id
})

const menu = ref();

const items = ref([


    {
        label: 'Editar perfil',
        icon: 'pi pi-cog',
        to: '/settings',
        visible: isOwnProfile
    },
    {
        label: 'Enviar mensaje',
        icon: 'pi pi-envelope',
        command: () => {

        }
    },
    {
        label: 'Reportar',
        icon: 'pi pi-exclamation-triangle',
        command: () => {

        }
    },
    {
        label: 'Expulsar',
        icon: 'pi pi-ban',
        visible: auth.isAdmin,
        command: () => {

        }
    }
]

);

const toggle = (event: any) => {
    menu.value.toggle(event);
};


</script>

<template>
    <Card>
        <template #content>
            <section class="flex flex-column gap-2">
                <article class="flex gap-3 align-items-center">
                    <ProfilePicture :image-url="user.avatar" :username="user.username" image-size="xlarge" />
                    <h1>{{ user.username }}</h1>
                    <div>
                        <Button v-if="auth.isAuthenticated.value" type="button" icon="pi pi-bars" label="Opciones" size="small" @click="toggle"
                            aria-haspopup="true" aria-controls="overlay_menu" />
                        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                    </div>
                </article>

                <article>
                    <span><i class="pi pi-calendar mr-1"></i>Se unió {{ getTimeAgo(user.createdAt ?? new Date()) }}</span>
                    <p v-if="user.biography"><i class="pi pi-info-circle mr-1"></i>{{ user.biography }}</p>
                </article>
            </section>
        </template>
    </Card>
</template>