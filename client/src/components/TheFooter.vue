<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Card from 'primevue/card';
import Divider from 'primevue/divider';

</script>

<template>
    <footer class="mt-2">
        <Card>
            <template #content>
                <ul class="list-none flex justify-content-center">
                    <li class="mr-5"><router-link to="/">Inicio</router-link></li>
                    <li class="mr-5">Términos de uso</li>
                    <li class="mr-5">Política de privacidad</li>
                </ul>
                <Divider type="solid" />
                <small class="flex justify-content-center">&#127341; Upcord {{ new Date().getFullYear() }}</small>
            </template>
        </Card>

    </footer>
</template>