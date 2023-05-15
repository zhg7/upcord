<script setup lang="ts">
import { ref } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Fieldset from 'primevue/fieldset';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import FileUpload, { type FileUploadRemoveEvent } from 'primevue/fileupload';
import ProfilePicture from '@/components/ProfilePicture.vue'
import { useAuth } from '@/store/auth';
import { changeProfileDetails, changeUserDetails } from '@/services/UserService';
import { showSuccess } from '@/services/ToastService';
import useVuelidator from '@vuelidate/core';
import { required, minLength, maxLength, email } from '@vuelidate/validators';

const auth = useAuth();

const profileDetails = ref({
    avatar: auth.user.value?.avatar,
    biography: auth.user.value?.biography
});

const userDetails = ref({
    username: auth.user.value?.username,
    email: auth.user.value?.email,
    password: ""
});

const profileRules = {
    biography: { maxLength: maxLength(170) }
};

const userRules = {
    username: { required: required, minLength: minLength(4), maxLength: maxLength(20) },
    email: { required: required, email: email },
    password: { minLength: minLength(8) }
};

const v_profile$ = useVuelidator(profileRules, profileDetails);
const v_user$ = useVuelidator(userRules, userDetails);


function convertImageBase64(event: FileUploadRemoveEvent) {
    const imageFile = event.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
        profileDetails.value.avatar = fileReader.result; // Mostrar previsualización antes de subir.
    }
    fileReader.readAsDataURL(imageFile);
}

async function saveProfileDetails() {
    const result = await v_profile$.value.$validate();

    if (result) {
        await changeProfileDetails(profileDetails.value.avatar, profileDetails.value.biography);
        showSuccess('Perfil actualizado', '');
    }
}

async function saveUserDetails() {
    const result = await v_user$.value.$validate();

    if (result) {
        await changeUserDetails(userDetails.value.username, userDetails.value.email, userDetails.value.password);
        await auth.checkSession();
        showSuccess('Usuario actualizado', '');
    }
}

</script>

<template>
    <Card>
        <template #title>
            <h3 class="text-start m-0">Mis ajustes</h3>

        </template>
        <template #content>
            <Toast position="bottom-center" />
            <div class="flex flex-column gap-4">
                <section class="card flex flex-column gap-4">
                    <Fieldset legend="Perfil">
                        <form>
                            <section class="grid justify-content-center">
                                <div class="lg:col-6 mb-5">
                                    <label for="avatar">Foto</label>
                                    <div class="flex align-items-center gap-3 mt-3">
                                        <ProfilePicture :image-url="profileDetails.avatar" :username=userDetails.username
                                            image-size="xlarge" />
                                        <div class="w-9">
                                            <FileUpload mode="basic" name="avatar" accept="image/*" customUpload
                                                :auto="true" @uploader="convertImageBase64" chooseLabel="Subir" />
                                        </div>
                                    </div>
                                </div>
                                <div class="lg:col-6">
                                    <label for="biography" class="block mb-3">Biografía</label>
                                    <Textarea id="biography" v-model="profileDetails.biography" autoResize rows="5"
                                        cols="30" class="w-full"
                                        :class="{ 'p-invalid': v_profile$.biography.$errors.length }" />
                                    <small class="block mt-2">Máximo 170 carácteres.</small>
                                </div>
                            </section>
                        </form>
                        <Button icon="pi pi-save" label="Guardar" class="mt-5" @click="saveProfileDetails" />
                    </Fieldset>
                </section>

                <section class="card flex flex-column gap-4">
                    <Fieldset legend="Cuenta">
                        <form>
                            <section class="grid">
                                <div class="lg:col-4">
                                    <div class="mb-3 w-full">
                                        <label for="username">Nombre de usuario</label>
                                        <InputText id="username" v-model="userDetails.username" type="text"
                                            class="w-full mb-2 mt-3"
                                            :class="{ 'p-invalid': v_user$.username.$errors.length }" />
                                        <small class="block">De 4 a 20 caracteres alfanuméricos.</small>
                                    </div>
                                </div>
                                <div class="lg:col-4">
                                    <label for="email">Dirección de e-mail</label>
                                    <InputText id="email" v-model="userDetails.email" type="text" class="w-full mb-3 mt-3"
                                        :class="{ 'p-invalid': v_user$.email.$errors.length }" />
                                </div>
                                <div class="lg:col-4">
                                    <label for="password">Contraseña</label>
                                    <Password id="pw" v-model="userDetails.password" type="password"
                                        class="w-full mb-2 mt-3" inputId="password" inputClass="w-full" :feedback=false
                                        toggleMask :class="{ 'p-invalid': v_user$.password.$errors.length }" />
                                    <small class="block">Mínimo 8 caracteres.</small>
                                </div>
                            </section>
                            <Button icon="pi pi-save" label="Guardar" class="mt-5" @click="saveUserDetails" />
                        </form>
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
                        <Button icon="pi pi-trash" label="Borrar cuenta" severity="danger" />
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