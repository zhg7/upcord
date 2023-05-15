import { http } from '@/services/HttpService';

export async function checkEmailAvailability(email: string) {
    const response = await http.get(`users/emails/${email}`);
    return response.data.exists;
}

export async function checkUsernameAvailability(username: string) {
    const response = await http.get(`users/usernames/${username}`);
    return response.data.exists;
}

export async function getUserDetails(username: string) {
    const response = await http.get(`users/${username}`);
    return response.data;
}

export async function changeProfileDetails(avatar: string, biography: string) {
    const response = await http.post(`users/profiles`, {
        "avatar": avatar,
        "biography": biography
    });
    return response.data;
}

export async function changeUserDetails(username: string, email: string, password: string) {
    const response = await http.post(`users`, {
        "username": username,
        "email": email,
        "password": password
    });

    return response.data;
}