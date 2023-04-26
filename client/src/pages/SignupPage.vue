<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { ref } from 'vue';
import useVuelidator from '@vuelidate/core';
import { required, sameAs, minLength, maxLength, email, alphaNum, helpers } from '@vuelidate/validators';
import { checkEmailAvailability, checkUsernameAvailability, sendSignupRequest } from '@/services/AuthService';

const formData = ref({
    email: "",
    username: "",
    password: "",
    agreeTerms: false,
});

const emailTaken = ref(false);
const usernameTaken = ref(false);
const signupSuccessful = ref(false);

const rules = {
    email: { required: helpers.withMessage('Campo obligatorio.', required), email: helpers.withMessage('Formato de e-mail inválido.', email) },
    username: { required: helpers.withMessage('Campo obligatorio.', required), alphaNum: helpers.withMessage('Solo debe contener letras y números.', alphaNum), minLength: helpers.withMessage('Debe contener entre 4 y 20 carácteres alfanuméricos.', minLength(4)), maxLength: helpers.withMessage('Debe contener entre 4 y 20 carácteres alfanuméricos.', maxLength(20)) },
    password: { required: helpers.withMessage('Campo obligatorio.', required), minLength: helpers.withMessage('Debe tener un mínimo de 8 carácteres.', minLength(8)) },
    agreeTerms: { sameAs: helpers.withMessage('Es obligatorio aceptar los términos.', sameAs(true)) }
};

const v$ = useVuelidator(rules, formData);

async function submitForm() {
    signupSuccessful.value = false;
    const result = await v$.value.$validate();
    if (result) {
        emailTaken.value = await checkEmailAvailability(formData.value.email);
        usernameTaken.value = await checkUsernameAvailability(formData.value.username);
        if (!emailTaken.value && !usernameTaken.value) {
            await sendSignupRequest(formData.value.email, formData.value.username, formData.value.password);
            signupSuccessful.value = true;
        }
    }
}

</script>
<template>
    <Card>
        <template #title>
            <h3 class="flex justify-content-center m-2 mb-2">Crear cuenta</h3>
        </template>
        <template #content>
            <div v-if="emailTaken || usernameTaken" class="flex align-items-center flex-column gap-2 mb-5 pb-3">
                <small v-if="emailTaken" class="p-error">Dirección de e-mail no disponible.</small>
                <small v-if="usernameTaken" class="p-error">Nombre de usuario no disponible.</small>
            </div>
            <div class="card flex justify-content-center">
                <form @submit.prevent="submitForm" class="flex flex-column gap-4">
                    <span class="p-float-label">
                        <InputText class="w-full" id="email" v-model="formData.email"
                            :class="{ 'p-invalid': v$.email.$errors.length || emailTaken }" />
                        <label for="email">Dirección de e-mail</label>
                    </span>
                    <small v-for="error in v$.email.$errors" :key="error.$uid" class="p-error" id="text-error">
                        {{ error.$message }}
                    </small>
                    <span class="p-float-label">
                        <InputText class="w-full" id="username" v-model="formData.username"
                            :class="{ 'p-invalid': v$.username.$errors.length || usernameTaken }" />
                        <label for="username">Nombre de usuario</label>
                    </span>
                    <small v-for="error in v$.username.$errors" :key="error.$uid" class="p-error" id="text-error">
                        {{ error.$message }}
                    </small>
                    <span class="p-float-label">
                        <Password inputClass="w-full" class="w-full" id="password" v-model="formData.password"
                            :class="{ 'p-invalid': v$.password.$errors.length }" :feedback=false toggleMask />
                        <label for="password">Contraseña</label>
                    </span>
                    <small v-for="error in v$.password.$errors" :key="error.$uid" class="p-error" id="text-error">
                        {{ error.$message }}
                    </small>
                    <div class="flex align-items-center">
                        <Checkbox inputId="acceptTerms" v-model="formData.agreeTerms"
                            :class="{ 'p-invalid': v$.agreeTerms.$errors.length }" :binary="true" />
                        <label for="acceptTerms" class="ml-2"><small>Acepto los términos de uso y la política de
                                privacidad.</small></label>
                    </div>
                    <small v-for="error in v$.agreeTerms.$errors" :key="error.$uid" class="p-error" id="text-error">
                        {{ error.$message }}
                    </small>
                    <Button label="Registrar" type="submit" />
                    <Message v-if="signupSuccessful" severity="success" class="max-w-25rem">Cuenta creada. Te hemos enviado
                        instrucciones al e-mail indicado para activar la cuenta.</Message>
                </form>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-content-center">
                <router-link to="/login"><Button label="Ya estoy registrado" link /></router-link>
            </div>
        </template>
    </Card>
</template>