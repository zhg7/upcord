<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { ref } from 'vue';
import useVuelidator from '@vuelidate/core';
import { required, sameAs, minLength, maxLength, email, alphaNum, helpers } from '@vuelidate/validators';

const formData = ref({
    email: "",
    username: "",
    password: "",
    agreeTerms: false
})

const rules = {
    email: { required: helpers.withMessage('Campo obligatorio.', required), email: helpers.withMessage('Formato de e-mail inválido.', email) },
    username: { required: helpers.withMessage('Campo obligatorio.', required), alphaNum: helpers.withMessage('Solo debe contener letras y números.', alphaNum), minLength: helpers.withMessage('Debe contener entre 4 y 20 carácteres alfanuméricos.', minLength(4)), maxLength: helpers.withMessage('Debe contener entre 4 y 20 carácteres alfanuméricos.', maxLength(20)) },
    password: { required: helpers.withMessage('Campo obligatorio.', required), minLength: helpers.withMessage('Debe tener un mínimo de 8 carácteres.', minLength(8)) },
    agreeTerms: { sameAs: helpers.withMessage('Es obligatorio aceptar los términos.', sameAs(true)) }
}

const v$ = useVuelidator(rules, formData);

async function submitForm() {
    const result = await v$.value.$validate();
    console.log(result)
}

</script>
<template>
    <Card>
        <template #title>
            <h3 class="flex justify-content-center">Crear cuenta</h3>
        </template>
        <template #content>
            <div class="card flex justify-content-center">
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
                        <InputText class="w-full" id="username" v-model="formData.username"
                            :class="{ 'p-invalid': v$.username.$errors.length }" />
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
                        <Checkbox id="acceptTerms" v-model="formData.agreeTerms"
                            :class="{ 'p-invalid': v$.agreeTerms.$errors.length }" :binary="true" />
                        <label for="acceptTerms" class="ml-2"><small>Acepto los términos de uso y la política de
                                privacidad.</small></label>
                    </div>
                    <small v-for="error in v$.agreeTerms.$errors" :key="error.$uid" class="p-error" id="text-error">
                        {{ error.$message }}
                    </small>
                    <Button label="Registrar" type="submit" />
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