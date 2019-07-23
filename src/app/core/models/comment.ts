import { User } from "./user";

export class Comment {
    /*
    id -> int, increment
    post_id -> int
    author -> string
    content -> text
    created_at -> date
    */
    id: number;
    post_id: number;
    authorId: number;
    author: User;
    content: string;
    created_at: Date;
  }