import {Post} from "./types-post.ts";

export interface CreatePostProps {
    addPost: (post: Omit<Post, 'id'>) => void;
}