import { http } from '@/services/HttpService';
import { useAuth } from '@/store/auth';
import { getUserDetails } from './UserService';

const auth = useAuth();

export async function getUserChats() {
    const response = await http.get(`chats/${auth.user.value.id}`);
    return response.data;
}

export async function getChatMessages(chatId: number) {
    const response = await http.get(`chats/messages/${chatId}`);
    return response.data;
}

export async function addChat(userTwoId: number) {
    const response = await http.post('chats', {
        userOneId: auth.user.value.id,
        userTwoId: userTwoId
    });

    return response.data;
}

export async function checkBlock(username: string) {
    // Tratar usuarios eliminados.
    try {
        await getUserDetails(username);
        const response = await http.get(`chats/blocks/${username}`);
        return response.data.blocked;
    } catch {
        return false;
    }

}

export async function addBlock(userId: number) {
    const response = await http.post('chats/blocks', {
        "userId": userId
    });

    return response.data;
}

export async function deleteBlock(userId: number) {
    const response = await http.delete('chats/blocks', {
        data: {
            "userId": userId
        }
    });

    return response.data;
}