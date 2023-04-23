import { ref } from 'vue';
import { sendLoginRequest, checkSessionStatus } from '@/services/auth.service';
import { http } from '@/services/http.service';


const user = ref();
const isAuthenticated = ref(false);


async function login(email: string, password: string) {
    const result = await sendLoginRequest(email, password);
    if (typeof result === 'object' && result !== null) {
        user.value = result;
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

async function logout(){
    http.get('auth/logout')
    isAuthenticated.value = false;
    
}

export function useAuth() {
    return {
        isAuthenticated,
        user,
        login,
        logout,
        checkSession
    }

}