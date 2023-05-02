export type Category = {
    id: number;
    title: string;
    subforums: Subforum[];
}

export type Subforum = {
    id: number;
    title: string;
    logo: string;
    description: string;
}