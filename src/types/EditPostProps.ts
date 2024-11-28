import {Post} from "./types-post.ts";

export interface editPostProps {
    posts: Post[];
    updatePost: (updatePost: Post) => void;
}