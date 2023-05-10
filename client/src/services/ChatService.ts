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