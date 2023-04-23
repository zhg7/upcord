import { computed, ref } from 'vue';
import { sendLoginRequest, checkSession } from '@/services/auth.service';

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

async function checkSessionStatus() {
    const result = await checkSession();
    if (result){
        user.value = result;
        isAuthenticated.value = true;
    } else {
        isAuthenticated.value = false; 
    }
}

export function useAuth() {
    return {
        isAuthenticated,
        user,
        login,
        checkSessionStatus
    }

}