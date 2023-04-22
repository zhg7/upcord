<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { ref } from 'vue';
import useVuelidator from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { http } from '@/services/http.service';
import { showError } from '@/services/toast.service';


http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    showError('Credenciales inválidas.', 'Revisa los datos introducidos.');
});

const formData = ref({
    email: "",
    password: "",
});

const rules = {
    email: { required: helpers.withMessage('Campo obligatorio.', required), email: helpers.withMessage('Formato de e-mail inválido.', email) },
    password: { required: helpers.withMessage('Campo obligatorio.', required) },
};

const v$ = useVuelidator(rules, formData);

async function submitForm() {
    const result = await v$.value.$validate();
    if (result) {
        login();
    }
}


async function login() {

    http.post('auth/login', {
        "email": formData.value.email,
        "password": formData.value.password
    })

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
                            :class="{ 'p-invalid': v$.email.$errors.length }" />
                        <label for="email">Dirección de e-mail</label>
                    </span>
                    <small v-for="error in v$.email.$errors" :key="error.$uid" class="p-error" id="text-error">
                        {{ error.$message }}
                    </small>
                    <span class="p-float-label">
                        <Password id="password" v-model="formData.password" :feedback=false toggleMask
                            :class="{ 'p-invalid': v$.password.$errors.length }" />
                        <label for="password">Contraseña</label>
                    </span>
                    <small v-for="error in v$.password.$errors" :key="error.$uid" class="p-error" id="text-error">
                        {{ error.$message }}
                    </small>
                    <Button label="Entrar" type="submit" />
                </form>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-content-center">
                <Button label="He olvidado mi contraseña" link />
                <router-link to="/signup"><Button label="No estoy registrado" link /></router-link>
            </div>
        </template>
    </Card>
</template>