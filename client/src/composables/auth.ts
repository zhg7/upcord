import { computed, ref } from 'vue';
import { sendLoginRequest } from '@/services/auth.service';

const isAuthenticated = ref(false);

async function login(email : string, password: string){
    const result = await sendLoginRequest(email, password);
    return result;
}

export function useAuth() {
    return {
        isAuthenticated,
        login
    }

}