import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/store/auth';
import { checkUsernameAvailability } from '@/services/UserService';
import { getSubforum, getThread } from '@/services/ForumService';

const auth = useAuth();

const HomePage = () => import('@/pages/HomePage.vue');
const LoginPage = () => import('@/pages/LoginPage.vue');
const SignupPage = () => import('@/pages/SignupPage.vue');
const NotFoundPage = () => import('@/pages/NotFoundPage.vue');
const SettingsPage = () => import('@/pages/SettingsPage.vue');
const ProfilePage = () => import('@/pages/ProfilePage.vue');
const ForumPage = () => import('@/pages/ForumPage.vue');
const ThreadPage = () => import('@/pages/ThreadPage.vue');
const ChatPage = () => import('@/pages/ChatPage.vue');
const UserManagerPage = () => import('@/pages/UserManagerPage.vue');

const DEFAULT_TITLE = 'Upcord';

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
      },
      beforeEnter: checkAuthentication,

    },
    {
      path: '/chats',
      name: 'chats',
      component: ChatPage,
      meta: {
        title: `Chats - ${DEFAULT_TITLE}`
      },
      beforeEnter: checkAuthentication,

    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: ProfilePage,
      beforeEnter: async (to, from) => {
        // Comprobar que existe el nombre de usuario del perfil
        const username = to.params.username as string;
        if (!await checkUsernameAvailability(username)) {
          return { name: 'notfound', params: { pathMatch: to.path.split('/').slice(1) }, }; // Evitar modificación URL
        } else {
          document.title = `Perfil de ${username} - ${DEFAULT_TITLE}`
        }
      }
    },
    {
      path: '/forum/:id',
      name: 'forum',
      component: ForumPage,
      beforeEnter: async (to, from) => {
        // Comprobar que existe el subforo en cuestión
        const subforumId = Number(to.params.id);
        const subforum = await getSubforum(subforumId);
        if (!subforum) {
          return { name: 'notfound', params: { pathMatch: to.path.split('/').slice(1) }, };
        } else {
          document.title = `Foro de ${subforum.title} - ${DEFAULT_TITLE}`
        }
      }
    },
    {
      path: '/thread/:id',
      name: 'thread',
      component: ThreadPage,
      beforeEnter: async (to, from) => {
        // Comprobar que existe el subforo en cuestión
        const threadId = Number(to.params.id);
        const thread = await getThread(threadId);
        if (!thread) {
          return { name: 'notfound', params: { pathMatch: to.path.split('/').slice(1) }, };
        } else {
          document.title = `${thread.title} - ${DEFAULT_TITLE}`
        }
      }
    },
    {
      path: '/user-manager',
      name: 'user-manager',
      component: UserManagerPage
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

// Comprobar si se ha iniciado sesión
function checkAuthentication() {
  if (!auth.isAuthenticated.value) {
    return { name: 'login' }
  }
}

export default router;
