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

export async function checkSessionStatus() {
    try {
        const response = await http.get('auth');
        return response.data.user;
    } catch (err: unknown) {
        return;
    }
}

export async function destroySession() {
    http.post('auth/logout');
}

export async function sendSignupRequest(email: string, username: string, password: string) {
    http.post('auth/signup', {
        "email": email,
        "username": username,
        "password": password
    });
}

export async function sendPasswordResetRequest(email: string) {
    http.post('auth/reset', {
        "email": email,
    });
}