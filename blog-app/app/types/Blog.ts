import { Comment } from "./Comment";

export interface Blog {
    id: string;
    title: string;
    body: string;
    comments: Comment[]
}