import { http } from '@/services/HttpService';

export async function getCategories(){
    const response = await http.get(`forums/categories`);
    return response.data;
}