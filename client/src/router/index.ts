import { createRouter, createWebHistory } from 'vue-router';

const DEFAULT_TITLE = 'Upcord';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/TheHome.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/TheLogin.vue'),
      meta: {
        title: `Iniciar sesión - ${DEFAULT_TITLE}`
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/TheSignup.vue'),
      meta: {
        title: `Crear cuenta - ${DEFAULT_TITLE}`
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'notfound',
      component: () => import('../views/NotFound.vue'),
      meta: {
          title: `Página no encontrada - ${DEFAULT_TITLE}`
      }
  }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta?.title as string ?? DEFAULT_TITLE; // Título de página dinámico
})



export default router;
