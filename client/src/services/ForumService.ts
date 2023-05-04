import { http } from '@/services/HttpService';

export async function getCategories() {
    const response = await http.get(`forums/categories`);
    return response.data;
}

export async function getSubforum(subforumId: number) {
    const response = await http.get(`forums/${subforumId}`);
    return response.data;
}

export async function getThreads(subforumId: number){
    const response = await http.get(`forums/threads/${subforumId}`);
    return response.data;
}