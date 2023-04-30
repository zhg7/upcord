import { http } from '@/services/HttpService';

export async function checkEmailAvailability(email : string) {
    const response = await http.get(`users/emails/${email}`);
    return response.data.exists;
}

export async function checkUsernameAvailability(username: string) {
    const response = await http.get(`users/usernames/${username}`);
    return response.data.exists;
}