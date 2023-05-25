<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { watch } from 'vue';
import Button from 'primevue/button';

const isDark = useDark();
const toggleDark = useToggle(isDark);

watch(isDark, (isDark) => {
    const theme = isDark ? "dark" : "light";
    const themeElement = document.getElementById('theme-link');
    themeElement!.setAttribute('href', `/themes/${theme}-theme.css`);
}, { immediate: true });

</script>

<template>
    <div>
        <Button @click="toggleDark()" :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'" :severity="isDark ? 'help' : 'warning'"
            text rounded aria-label="Theme toggler" />
    </div>
</template>