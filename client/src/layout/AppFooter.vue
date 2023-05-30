<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Card from 'primevue/card';

</script>

<template>
    <footer class="mt-2">
        <Card>
            <template #content>
                <ul class="list-none flex justify-content-center">
                    <li class="mr-5"><router-link class="text-primary no-underline hover:underline"
                            to="/">Inicio</router-link></li>
                    <li class="mr-5"><router-link class="text-primary no-underline hover:underline" to="/">Términos de
                            uso</router-link></li>
                    <li class="mr-5"><router-link class="text-primary no-underline hover:underline" to="/privacy">Política de
                            privacidad</router-link></li>
                </ul>
                
                <small class="flex justify-content-center text-color-secondary">(CC) Upcord {{ new Date().getFullYear()
                }}</small>
            </template>
        </Card>

    </footer>
</template>