import { computed, ref } from 'vue';
import { sendLoginRequest } from '@/services/auth.service';

const isAuthenticated = computed(() => {
    return user.value !== null;
});

const user = ref(null);

async function login(email : string, password: string){
    const result = await sendLoginRequest(email, password);
    if (typeof result === 'object' && result !== null){
        user.value = result;
    }
    return result;
}

export function useAuth() {
    return {
        isAuthenticated,
        login
    }

}