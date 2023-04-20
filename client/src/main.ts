import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import "primevue/resources/themes/viva-dark/theme.css";
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';
import "primeflex/primeflex.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);

export const toast = app.config.globalProperties.$toast;

app.mount('#app');
