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

export async function getThread(threadId: number) {
    const response = await http.get(`forums/threads/thread/${threadId}`);
    return response.data;
}

export async function getComments(threadId: number) {
    const response = await http.get(`forums/comments/${threadId}`);
    return response.data;
}

export async function getComment(commentId: number) {
    const response = await http.get(`forums/comments/comment/${commentId}`);
    return response.data;
}

export async function createComment(threadId: number, content: string) {
    const response = await http.post('forums/comments', {
        "threadId": threadId,
        "content": content,
    });

    return response.data;
}

export async function changeComment(commentId: number, content: string) {
    const response = await http.post('forums/comments/comment', {
        "commentId": Number(commentId),
        "content": content
    });

    return response.data;
}

export async function createReply(threadId: number, content: string, parentPostId: number){
    const response = await http.post('forums/replies', {
        "threadId": threadId,
        "content": content,
        "parentPostId" : parentPostId
    });

    return response.data;
}

export async function getReplies(commentId: number) {
    const response = await http.get(`forums/replies/${commentId}`);
    return response.data;
}