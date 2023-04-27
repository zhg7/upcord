import { http } from '@/services/HttpService';

export async function sendLoginRequest(email: string, password: string) {
    try {
        const response = await http.post('auth/login', {
            "email": email,
            "password": password
        })
        return response.data
    } catch (err: any) {
        return err.response.data
    }
}

export async function checkSessionStatus(){
    try {
        const response = await http.get('auth');
        return response.data.user;
    } catch (err : unknown) {
        return;
    }
}

export async function destroySession(){
    http.post('auth/logout');
}

export async function checkEmailAvailability(email : string) {
    const response = await http.get(`users/emails/${email}`);
    return response.data.exists;
}

export async function checkUsernameAvailability(username: string) {
    const response = await http.get(`users/usernames/${username}`);
    return response.data.exists;
}

export async function sendSignupRequest(email : string, username: string, password: string) {
    http.post('auth/signup', {
        "email": email,
        "username": username,
        "password": password
    })
}