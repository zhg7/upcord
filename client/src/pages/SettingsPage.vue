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

const profileDetails = ref({
    avatar: auth.user.value?.avatar,
    biography: auth.user.value?.biography
})

const userDetails = ref({
    username: auth.user.value?.username,
    email: auth.user.value?.email,
    password: ""
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
                        <section class="grid justify-content-center">
                            <div class="lg:col-8 mb-5">
                                <label for="avatar">Foto</label>
                                <div class="flex align-items-center gap-3 mt-3">
                                    <ProfilePicture :image-url=auth.user.value.avatar :username=auth.user.value.username image-size="xlarge" />
                                    <div class="w-9">
                                        <InputText id="avatar" type="text" class="w-12" v-model="profileDetails.avatar"/>
                                        <small class="block mt-2">Introduce la URL de una
                                            imagen.</small>
                                    </div>
                                </div>
                            </div>
                            <div class="lg:col-4">
                                <label for="biography" class="block mb-3">Biografía</label>
                                <Textarea id="biography" v-model="profileDetails.biography" autoResize rows="5" cols="30" />
                                <small class="block mt-2">Máximo 170 carácteres.</small>
                            </div>
                        </section>
                        <Button label="Guardar" class="mt-5" />
                    </Fieldset>
                </section>

                <section class="card flex flex-column gap-4">
                    <Fieldset legend="Cuenta">
                        <section class="grid">
                            <div class="lg:col-4">
                                <div class="mb-3 w-full">
                                    <label for="username">Nombre de usuario</label>
                                    <InputText id="username" v-model="userDetails.username" type="text"
                                        class="w-full mb-2 mt-3" />
                                    <small class="block">De 4 a 20 caracteres alfanuméricos.</small>
                                </div>
                            </div>
                            <div class="lg:col-4">
                                <label for="email">Dirección de e-mail</label>
                                <InputText id="email" v-model="userDetails.email" type="text" class="w-full mb-3 mt-3" />
                            </div>
                            <div class="lg:col-4">
                                <label for="password">Contraseña</label>
                                <Password id="pw" v-model="userDetails.password" type="password" class="w-full mb-2 mt-3"
                                    inputId="password" inputClass="w-full" :feedback=false toggleMask />
                                <small class="block">Mínimo 8 caracteres.</small>
                            </div>
                        </section>
                        <Button label="Guardar" class="mt-5" />
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
    </Card>
</template>

<style scoped>
.dangerous-section {
    border-color: var(--red-600);
    border-width: 0.15em;
}
</style>