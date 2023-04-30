import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/store/auth';
const DEFAULT_TITLE = 'Upcord';
const auth = useAuth();

const HomePage = () => import('../pages/HomePage.vue');
const LoginPage = () => import('../pages/LoginPage.vue');
const SignupPage = () => import('../pages/SignupPage.vue');
const NotFoundPage = () => import('../pages/NotFoundPage.vue');
const SettingsPage = () => import('../pages/SettingsPage.vue');
const ProfilePage = () => import('../pages/ProfilePage.vue');

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
      path: '/settings',
      name: 'settings',
      component: SettingsPage,
      meta: {
        title: `Ajustes - ${DEFAULT_TITLE}`
      }
    },
    {
      path: '/profile/:username?/',
      name: 'profile',
      component: ProfilePage,
      meta: {
        title: `Perfil de  - ${DEFAULT_TITLE}`
      },
      beforeEnter: async (to, from) => {
        const username = to.params.username as string;
        if(username){
          document.title = `Perfil de ${username} - ${DEFAULT_TITLE}`
        } else {
          document.title = `Mi perfil - ${DEFAULT_TITLE}`
        }

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

router.beforeEach(async (to, from) => {
  // Título de página dinámico
  document.title = to.meta?.title as string ?? DEFAULT_TITLE;

  // Comprobar estado sesión
  await auth.checkSession();
})


export default router;
