import { http } from '@/services/http.service';


export async function sendLoginRequest(email: string, password: string) {
    try {
        const response = await http.post('auth/login', {
            "email": email,
            "password": password
        })
        return response.data.user // Devuelve objeto en caso de éxito.
    } catch (err: any) {
        return err.response.data.login // Devuelve el motivo en caso de error.
    }
}

export async function checkSessionStatus(){
    try {
        const response = await http.get('/auth');
        return response.data.user;
    } catch (err : any) {
        return;
    }

}
