<script setup lang="ts">
import { ref } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Fieldset from 'primevue/fieldset';
import Password from 'primevue/password';
import Button from 'primevue/button';
import ProfilePicture from '@/components/ProfilePicture.vue'
import { useAuth } from '@/store/auth';

const auth = useAuth();

const profileOptions = ref({
    avatar: "",
    biography: ""
})

const userDetails = ref({
    username: auth.user.value?.username,
    email: auth.user.value?.email,
})

</script>

<template>
    <Card>
        <template #title>
            <h3 class="text-start m-0">Mis ajustes</h3>

        </template>
        <template #content>
            <div class="flex flex-column gap-4">
                <section class="card flex flex-column gap-4">
                    <Fieldset legend="Perfil">
                        <div class="grid justify-content-center">
                            <div class="lg:col-4">
                                <label for="avatar">Foto</label>
                                <div class="flex align-items-center gap-3 mt-3">
                                    <ProfilePicture />
                                    <InputText id="avatar" type="text" />
                                </div>
                            </div>
                            <div class="lg:col-8">
                                <label for="biography" class="block mb-3">Biografía</label>
                                <Textarea id="biography" autoResize rows="5" cols="30" />
                            </div>
                        </div>
                    </Fieldset>
                </section>

                <section class="card flex flex-column gap-4">
                    <Fieldset legend="Cuenta">
                        <div class="grid">
                            <div class="lg:col-4">
                                <label for="username" >Nombre de usuario</label>
                                <InputText id="username" v-model="userDetails.username" type="text" class="w-full mb-3 mt-3" />
                            </div>
                            <div class="lg:col-4">
                                <label for="email" >Dirección de e-mail</label>
                                <InputText id="email" v-model="userDetails.email" type="text" class="w-full mb-3 mt-3" />
                            </div>
                            <div class="lg:col-4">
                                <label for="password">Contraseña</label>
                                <Password id="password" type="password" class="w-full mb-3 mt-3" inputId="password"
                                    inputClass="w-full" :feedback=false toggleMask />
                            </div>
                        </div>
                    </Fieldset>
                </section>
                <section class="card flex flex-column gap-4">
                    <Fieldset class="dangerous-section">
                        <template #legend>
                            <div class="flex align-items-center text-red-600">
                                <span class="pi pi-exclamation-triangle mr-2"></span>
                                <span class="font-bold text-lg">Zona peligrosa</span>
                            </div>
                        </template>
                        <p class="m-0 mb-4">¡Cuidado! Estas acciones son destructivas e irreversibles.</p>
                        <Button label="Borrar cuenta" severity="danger" />
                    </Fieldset>
                </section>
            </div>
        </template>
        <template #footer>

        </template>
    </Card>
</template>

<style scoped>
.dangerous-section {
    border-color: var(--red-600);
    border-width: 0.15em;
}
</style>