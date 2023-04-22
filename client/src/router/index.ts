import { createRouter, createWebHistory } from 'vue-router';

const DEFAULT_TITLE = 'Upcord';

const HomePage = () => import('../pages/HomePage.vue');
const LoginPage = () => import('../pages/LoginPage.vue');
const SignupPage = () => import('../pages/SignupPage.vue');
const NotFoundPage = () => import('../pages/NotFoundPage.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        title: `Iniciar sesión - ${DEFAULT_TITLE}`
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
      meta: {
        title: `Crear cuenta - ${DEFAULT_TITLE}`
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'notfound',
      component: NotFoundPage,
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
