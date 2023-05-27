import { http } from '@/services/HttpService';
import { useAuth } from '@/store/auth';

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
    await http.post('chats', {
        userOneId: auth.user.value.id,
        userTwoId: userTwoId
    })
}

export async function checkBlock(username: string) {
    const response = await http.get(`chats/blocks/${username}`);
    return response.data.blocked;
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