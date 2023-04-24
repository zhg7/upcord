<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from './layout/AppNavbar.vue';
import AppFooter from './layout/AppFooter.vue';
import { useAuth } from './store/auth';

const auth = useAuth();

</script>

<template>
  <AppNavbar :key="auth.user.value?.username"/>
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style>
body {
  background-color: var(--surface-ground);
}
</style>
