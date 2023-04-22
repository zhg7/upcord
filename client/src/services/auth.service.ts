import { http } from '@/services/http.service';
import type { AxiosError } from 'axios';

export async function sendLoginRequest(email: string, password: string) {
    try {
        const response = await http.post('auth/login', {
            "email": email,
            "password": password
        })
        return response.data.login
    } catch (err: any) {
        return err.response.data.login
    }


}


/*http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return getLoginError(error.response.data.login);
});*/
