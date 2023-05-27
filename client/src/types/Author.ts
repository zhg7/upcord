export type Author = {
    authorId: number;
    username?: string
}

export type User = {
    id: number,
    username: string,
    password: string,
    email: string,
    isAdmin: boolean,
    avatar: string
    biography: string,
    isActivated: boolean
}