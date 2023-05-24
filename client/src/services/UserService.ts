import { http } from '@/services/HttpService';
import { useAuth } from '@/store/auth';

const auth = useAuth();

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

export async function getUserBan(username: string) {
    const response = await http.get(`users/bans/${username}`);
    return response.data;
}

export async function addUserBan(userId: number, reason: string, expiresAt: Date) {
    const response = await http.post(`users/bans`, {
        "targetUserId": userId,
        "authorUserId": auth.user.value.id,
        "reason": reason,
        "expiresAt": expiresAt
    });

    return response.data;
}

export async function deleteUserBan(banId: number) {
    const response = await http.delete(`users/bans`, {
        data: {
            "banId": banId
        }
    });

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

export async function getStats(username: string) {
    const response = await http.get(`users/stats/${username}`);
    return response.data;
}