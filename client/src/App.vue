<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavbar from './layouts/TheNavbar.vue';
import TheFooter from './layouts/TheFooter.vue';
</script>

<template>
  <TheNavbar />
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
