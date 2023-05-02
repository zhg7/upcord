export type Category = {
    id: number;
    title: string;
    subforums: Subforum[];
}

type Subforum = {
    id: number;
    title: string;
    logo: string;
    description: string;
}