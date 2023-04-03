<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/button';


import { ref } from 'vue';

const email = ref(null);
const password = ref(null);

</script>

<template>
    <main>
        <div class="card">
            <Card>
                <template #title>
                    <h3 class="flex justify-content-center">Iniciar sesión</h3>
                </template>
                <template #content>
                    <div class="card flex justify-content-center">
                        <form class="flex flex-column gap-4">
                            <span class="p-float-label">
                                <InputText class="w-full" id="email" v-model="email" />
                                <label for="email">Dirección de e-mail</label>
                            </span>
                            <span class="p-float-label">    
                                <Password id="password" v-model="password" :feedback=false toggleMask/>
                                <label for="password">Contraseña</label>
                            </span>
                            <Button label="Entrar" />
                        </form>
                    </div>
                </template>
                <template #footer>
                    <div class="flex justify-content-center">
                        <Button label="He olvidado mi contraseña" link />
                        <Button label="No estoy registrado" link />
                    </div>
                </template>
            </Card>
        </div>
    </main>
</template>