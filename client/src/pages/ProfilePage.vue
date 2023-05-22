<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import Card from 'primevue/card';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Toast from 'primevue/toast';
import ProfilePicture from '@/components/ProfilePicture.vue';
import { useAuth } from '@/store/auth';
import { getUserDetails, getUserBan, addUserBan, deleteUserBan } from '@/services/UserService';
import { addChat } from '@/services/ChatService';
import { getTimeAgo, formatDate } from '@/utils/time';
import useVuelidator from '@vuelidate/core';
import { required, minValue, minLength } from '@vuelidate/validators';
import { showSuccess } from '@/services/ToastService';

const route = useRoute();
const auth = useAuth();

const user: any = ref({});
const ban: any = ref({});

const banningMode = ref(false);

const banFormData = ref({
    reason: "",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hora por defecto.
})

const banRules = {
    reason: { required: required, minLength: minLength(1) },
    expiresAt: { required: required, minValue: minValue(new Date().getTime() + 60000) } // 1 minuto mínimo
};

const v_ban$ = useVuelidator(banRules, banFormData);

onMounted(async () => {
    await updateView(route.params.username as string);
})

onBeforeRouteUpdate(async (to, from) => {
    await updateView(to.params.username as string);
})

async function updateView(username: string) {
    user.value = await getUserDetails(username);

    if (auth.isAdmin.value) {
        ban.value = await getUserBan(username);
    }
}

// Ocultar envío de mensaje y mostrar ajustes en perfil propio.
const isOwnProfile = computed(() => {
    if (!auth.user.value){
        return false;
    }

    return auth.user.value.id === user.value.id;
})

// Verificar si está expulsado
const isUserBanned = computed(() => {
    return ban.value !== null;
})

const menu = ref();

const items = ref([

    {
        label: 'Enviar mensaje',
        icon: 'pi pi-envelope',
        to: '/chats',
        command: createChat
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
        separator: !auth.isAdmin || isUserBanned,
        command: () => {
            banningMode.value = true;
        }
    },
    {
        label: 'Retirar expulsión',
        icon: 'pi pi-check-circle',
        visible: isUserBanned,
        separator: !auth.isAdmin.value,
        command: unbanUser
    }
]

);

function toggleMenu(event: MouseEvent) {
    menu.value.toggle(event);
};

function createChat() {
    addChat(user.value.id)
}

async function banUser() {
    const validationPassed = await v_ban$.value.$validate();

    if (validationPassed) {
        await addUserBan(user.value.id, banFormData.value.reason, banFormData.value.expiresAt);
        showSuccess("Usuario suspendido", `${user.value.username} no podrá iniciar sesión hasta el ${formatDate(banFormData.value.expiresAt)}`);
        banningMode.value = false;
        await updateView(route.params.username as string);
    }
}

async function unbanUser() {
    await deleteUserBan(ban.value.id);
    showSuccess("Expulsión retirada.", `${user.value.username} ya puede volver a iniciar sesión.`);
    await updateView(route.params.username as string)
}


</script>

<template>
    <Card>
        <template #content>
            <section class="flex flex-column gap-2">
                <Toast position="bottom-center" />
                <article class="flex gap-3 align-items-center">
                    <ProfilePicture :image-url="user.avatar" :username="user.username" image-size="xlarge" />
                    <h1>{{ user.username }}</h1>
                    <div v-if="!isOwnProfile">
                        <Button v-if="auth.isAuthenticated.value" type="button" icon="pi pi-bars" label="Opciones"
                            size="small" @click="toggleMenu" aria-haspopup="true" aria-controls="overlay_menu" />
                        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                    </div>
                </article>

                <article>
                    <span v-tooltip.top="formatDate(user.createdAt ?? new Date())"><i class="pi pi-calendar mr-1"></i>Se
                        unió {{ getTimeAgo(user.createdAt ?? new Date()) }}</span>
                    <p v-if="user.biography"><i class="pi pi-info-circle mr-1"></i>{{ user.biography }}</p>
                </article>
            </section>
        </template>
    </Card>

    <!-- Modal expulsión -->
    <Dialog v-model:visible="banningMode" modal header="Expulsar usuario" :style="{ width: '75vw' }">
        <form class="flex flex-column gap-3">
            <label for="thread-title">Razón</label>
            <InputText id="thread-title" type="text" v-model="banFormData.reason"
                :class="{ 'p-invalid': v_ban$.reason.$errors.length }" />
            <small class="block mt-2">Mínimo 1 carácter.</small>

            <label for="calendar-24h">Hasta</label>
            <Calendar id="calendar-24h" v-model="banFormData.expiresAt" showTime hourFormat="24" showIcon
                date-format="dd/mm/yy" :class="{ 'p-invalid': v_ban$.expiresAt.$errors.length }" />
            <small class="block mt-2">Mínimo 1 minuto.</small>
        </form>
        <template #footer>
            <Button label="Cancelar" severity="danger" icon="pi pi-times" @click="banningMode = false" text />
            <Button label="Expulsar" icon="pi pi-ban" autofocus @click="banUser()" />
        </template>
    </Dialog>
</template>

