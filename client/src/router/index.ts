import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const DEFAULT_TITLE = 'Upcord';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/TheLogin.vue'),
      meta: {
        title: `Iniciar sesión - ${DEFAULT_TITLE}`
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../components/TheSignup.vue'),
      meta: {
        title: `Crear cuenta - ${DEFAULT_TITLE}`
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'notfound',
      component: () => import('../components/ClientError.vue'),
      props: { isNotFound: true },
      meta: {
          title: `Página no encontrada - ${DEFAULT_TITLE}`
      }
  }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta?.title as string ?? DEFAULT_TITLE; // Evitar undefined si no existe un título definido.
})



export default router;
