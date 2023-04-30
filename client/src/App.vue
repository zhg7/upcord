<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from './layout/AppNavbar.vue';
import AppFooter from './layout/AppFooter.vue';
import { useAuth } from './store/auth';

const auth = useAuth();

</script>

<template>
  <AppNavbar :key="auth.user.value?.username" />
  <main>
    <Transition name="fade">
        <RouterView />
    </Transition>
  </main>
  <AppFooter />
</template>

<style scoped>
.fade-enter-active {
  animation: fade 0.45s ease-in-out;
}

@keyframes fade {
  from {
    opacity: 0;
  }

  50% {
    opacity: 50%;
  }

  to {
    opacity: 1;
  }
}

.fade-leave-active {
  animation: slide 0.45s ease-in-out;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-300px);
  }
}
</style>
