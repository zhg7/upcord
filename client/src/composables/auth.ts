import { computed, ref } from 'vue';
import { sendLoginRequest, checkSession } from '@/services/auth.service';

const isAuthenticated = computed(() => {
    return sessionValid;
});

const user = ref(null);
const sessionValid = ref(false);

async function login(email: string, password: string) {
    const result = await sendLoginRequest(email, password);
    if (typeof result === 'object' && result !== null) {
        sessionValid.value = true;
        user.value = result;
    }
    return result;
}

async function checkSessionStatus() {
    const result = await checkSession();
    if (result){
        user.value = result;
        sessionValid.value = true;
    } else {
        sessionValid.value = false; 
    }
}

export function useAuth() {
    return {
        isAuthenticated,
        login,
        checkSessionStatus
    }

}