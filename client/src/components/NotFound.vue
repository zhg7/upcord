<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';

</script>

<template>
    <Card>
        <template #title>
            <h3 class="flex justify-content-center">Error 404</h3>
        </template>
        <template #content>
            <figure class="flex justify-content-center">
                <img alt="not found" src="@/assets/images/not-found.svg" height="280">
            </figure>
            <p class="text-xl text-center font-semibold">No se ha podido encontrar la página solicitada.</p>
        </template>
        <template #footer>
            <section class="flex justify-content-center">
                <router-link to="/"><Button label="Volver al inicio" icon="pi pi-home" raised link /></router-link>
            </section>
        </template>
    </Card>
</template>