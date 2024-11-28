import {Post} from "./types-post.ts";

export interface AdminPageProps {
           posts: Post[];
           deletePost: (id: number) => void;
       }