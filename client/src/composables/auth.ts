import { computed, ref } from 'vue';

const isAuthenticated = ref(false);




export function useAuth(){
    return {
        isAuthenticated,

    }

}