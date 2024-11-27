import {Post} from "./types-post.ts";

export interface PostDetailProps {
    post: Post;
    canEdit: boolean;
}