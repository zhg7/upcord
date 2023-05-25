import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

//import "@/assets/styles/light-theme.css";
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';
import "primeflex/primeflex.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.directive('tooltip', Tooltip);

export const toast = app.config.globalProperties.$toast;

app.mount('#app');


