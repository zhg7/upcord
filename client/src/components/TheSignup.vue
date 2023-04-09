<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { ref } from 'vue';

const email = ref("");
const username = ref("");
const password = ref("");
const acceptTerms = ref(false);

</script>
<template>
    <Card>
        <template #title>
            <h3 class="flex justify-content-center">Crear cuenta</h3>
        </template>
        <template #content>
            <div class="card flex justify-content-center">
                <form class="flex flex-column gap-4">
                    <span class="p-float-label">
                        <InputText class="w-full" id="email" v-model="email" />
                        <label for="email">Dirección de e-mail</label>
                    </span>
                    <span class="p-float-label">
                        <InputText class="w-full" id="username" v-model="username" />
                        <label for="username">Nombre de usuario</label>
                    </span>
                    <span class="p-float-label">
                        <Password id="password" v-model="password" :feedback=false toggleMask />
                        <label for="password">Contraseña</label>
                    </span>
                    <div class="flex align-items-center">
                        <Checkbox id="acceptTerms" v-model="acceptTerms" :binary="true" />
                        <label for="acceptTerms" class="ml-2"><small>Acepto los términos de uso<br /> y la política de
                                privacidad</small></label>
                    </div>
                    <Button label="Registrar" />
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