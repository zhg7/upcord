<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { ref } from 'vue';

defineProps({
    isLogin: Boolean,
})

const email = ref("");
const username = ref("");
const password = ref("");
const repeatPassword = ref("");
const rememberMe = ref(false);
const acceptTerms = ref(false);

</script>
<template>
    <Card>
        <template #title>
            <h3 v-if="isLogin" class="flex justify-content-center">Iniciar sesión</h3>
            <h3 v-else="isLogin" class="flex justify-content-center">Crear cuenta</h3>
        </template>
        <template #content>
            <div class="card flex justify-content-center">
                <form class="flex flex-column gap-4">
                    <span class="p-float-label">
                        <InputText class="w-full" id="email" v-model="email" />
                        <label for="email">Dirección de e-mail</label>
                    </span>
                    <span v-if="!isLogin" class="p-float-label">
                        <InputText class="w-full" id="username" v-model="username" />
                        <label for="username">Nombre de usuario</label>
                    </span>
                    <span class="p-float-label">
                        <Password id="password" v-model="password" :feedback=false toggleMask />
                        <label for="password">Contraseña</label>
                    </span>
                    <span v-if="!isLogin" class="p-float-label">
                        <Password id="repeatPassword" v-model="repeatPassword" :feedback=false toggleMask />
                        <label for="repeatPassword">Repite la contraseña</label>
                    </span>
                    <div v-else class="flex align-items-center">
                        <Checkbox id="rememberMe" v-model="rememberMe" :binary="true" />
                        <label for="rememberMe" class="ml-2">Recuérdame</label>
                    </div>
                    <div v-if="!isLogin" class="flex align-items-center">
                        <Checkbox id="acceptTerms" v-model="acceptTerms" :binary="true" />
                        <label for="acceptTerms" class="ml-2"><small>Acepto los términos de uso<br /> y la política de
                                privacidad</small></label>
                    </div>
                    <Button v-if="isLogin" label="Entrar" />
                    <Button v-else label="Registrar" />
                </form>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-content-center">
                <Button v-if="isLogin" label="He olvidado mi contraseña" link />
                <router-link v-if="isLogin" to="/signup"><Button label="No estoy registrado" link /></router-link>
                <router-link v-else to="/login"><Button label="Ya estoy registrado" link /></router-link>
            </div>
        </template>
    </Card>
</template>