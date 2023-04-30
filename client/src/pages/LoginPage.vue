<script setup lang="ts">
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { ref } from 'vue';
import useVuelidator from '@vuelidate/core';
import { required, requiredUnless, email, helpers } from '@vuelidate/validators';
import toast, { showError, showWarning, showSuccess, showInfo } from '@/services/ToastService';
import { useAuth } from '@/store/auth';

enum LoginResult  {
    FAILED = "failed",
    UNVERIFIED = "unverified",
    BANNED = "banned",
    SUCCESSFUL = "successful"
}

const auth = useAuth();
const router = useRouter();

const formData = ref({
    email: "",
    password: "",
});

const isDisabled = ref(false); // Prevenir múltiples submit mientras se espera a la redirección.
const forgottenPassword = ref(false);


const rules = {
    email: { required: helpers.withMessage('Campo obligatorio.', required), email: helpers.withMessage('Formato de e-mail inválido.', email) },
    password: { requiredIf: helpers.withMessage('Campo obligatorio.', requiredUnless(forgottenPassword)) },
};

const v$ = useVuelidator(rules, formData);

async function submitForm() {
    forgottenPassword.value = false; // Volver a requerir los dos campos.
    const isFormValidated = await v$.value.$validate();
    toast.removeAllGroups();
    if (isFormValidated) {
        const loginResult = await auth.login(formData.value.email, formData.value.password)
        handleLoginResult(loginResult)
    }
}

function handleLoginResult(loginResult: any) {

    switch (loginResult.login) {
        case LoginResult.FAILED:
            showError('Credenciales inválidas.', 'Revisa los datos introducidos.');
            break;
        case LoginResult.UNVERIFIED:
            showWarning('E-mail no verificado.', 'Activa la cuenta con el enlace que hemos enviado a tu e-mail.');
            break;
        case LoginResult.BANNED:
            showError('Cuenta expulsada', `Por ${loginResult.ban.reason}, hasta ${loginResult.ban.expiresAt}`);
            break;
        case LoginResult.SUCCESSFUL:
            isDisabled.value = true;
            showSuccess(`¡Bienvenido ${auth.user.value.username}!`, 'Redirigiendo al inicio...');
            setTimeout(() => {
                router.push({ name: "home" });
            }, 1200)
    }

}

async function handleForgottenPassword() {
    forgottenPassword.value = true; // Requerir solo el campo de e-mail
    const isFormValidated = await v$.value.$validate();
    if (isFormValidated) {
        showInfo('Reseteo de contraseña iniciado.', 'Recibirás un e-mail con las instrucciones.')
    }
}

</script>
<template>
    <Card>
        <template #title>
            <h3 class="flex justify-content-center">Iniciar sesión</h3>
        </template>
        <template #content>
            <div class="card flex justify-content-center">
                <Toast position="bottom-center" />
                <form @submit.prevent="submitForm" class="flex flex-column gap-4">
                    <span class="p-float-label">
                        <InputText class="w-full" id="email" v-model="formData.email"
                            :class="{ 'p-invalid': v$.email.$errors.length }" :disabled="isDisabled" />
                        <label for="email">Dirección de e-mail</label>
                    </span>
                    <small v-for="error in v$.email.$errors" :key="error.$uid" class="p-error" id="text-error">
                        {{ error.$message }}
                    </small>
                    <span class="p-float-label">
                        <Password id="password" v-model="formData.password" :feedback=false toggleMask
                            :class="{ 'p-invalid': v$.password.$errors.length }" :disabled="isDisabled" />
                        <label for="password">Contraseña</label>
                    </span>
                    <small v-for="error in v$.password.$errors" :key="error.$uid" class="p-error" id="text-error">
                        {{ error.$message }}
                    </small>
                    <Button label="Entrar" type="submit" :disabled="isDisabled" />
                </form>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-content-center">
                <Button label="Resetear contraseña" text @click="handleForgottenPassword" />
                <router-link to="/signup"><Button label="No estoy registrado" link /></router-link>
            </div>
        </template>
    </Card>
</template>