import { ref, computed } from 'vue';
import { sendLoginRequest, checkSessionStatus, destroySession } from '@/services/AuthService';

//Estado
const user = ref();
const isAuthenticated = ref(false);
const isAdmin = computed(() => {
    return user.value.isAdmin
})

//Acciones
async function login(email: string, password: string) {
    const result = await sendLoginRequest(email, password);
    if (result.user) {
        user.value = result.user;
        isAuthenticated.value = true;
    }
    return result;
}

async function checkSession() {
    const result = await checkSessionStatus();
    if (result) {
        user.value = result;
        isAuthenticated.value = true;
    } else {
        isAuthenticated.value = false;
    }
}

async function logout() {
    await destroySession();
    user.value = {};
    isAuthenticated.value = false;
}

//Hook
export function useAuth() {
    return {
        isAuthenticated,
        isAdmin,
        user,
        login,
        logout,
        checkSession
    }

}