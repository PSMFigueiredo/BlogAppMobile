export interface Post{
    id: string;
    title: string;
    author: Author;
    content: string
    class: Class,
    published: boolean
}

export interface Class{
    id: string;
    name: string;
}

export interface Author{
    id: string;
    name: string;
    email: string;
}