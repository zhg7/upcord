import { http } from '@/services/HttpService';
import { useAuth } from '@/store/auth';

const auth = useAuth();

export async function getCategories() {
    const response = await http.get(`forums/categories`);
    return response.data;
}

export async function getSubforum(subforumId: number) {
    const response = await http.get(`forums/${subforumId}`);
    return response.data;
}

export async function getThreads(subforumId: number) {
    const response = await http.get(`forums/threads/${subforumId}`);
    return response.data;
}

export async function createThread(subforumId: number, title: string, content: string) {
    const response = await http.post('forums/threads', {
        "title": title,
        "content": content,
        "subforumId": subforumId,
    })

    return response.data;
}

export async function getThread(threadId: number){
    const response = await http.get(`forums/threads/thread/${threadId}`);
    return response.data;
}