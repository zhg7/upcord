<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavbar from './layouts/TheNavbar.vue';
import TheFooter from './layouts/TheFooter.vue';
import { useAuth } from './store/auth';

const auth = useAuth();

</script>

<template>
  <TheNavbar :key="auth.user.value?.username"/>
  <main>
    <RouterView />
  </main>
  <TheFooter />
</template>

<style>
body {
  background-color: var(--surface-ground);
}
</style>
