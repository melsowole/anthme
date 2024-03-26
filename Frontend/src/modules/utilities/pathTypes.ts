type User = {
    id?: string,
    username: string,
    password: string,
    userImage: string,
    posts?: string[]
};

 type Post = {
    id: string,
    category: string,
    title: string,
    body: string,
    comments: string[],
    user?: {
        id: string,
        username: string,
        userImage: string
    }
} 

type Comments ={
    id: string,
    body: string,
    created: string,
    user:{
        id?: string,
        created?: string,
        username: string,
        userImage: string
    }
}

export {User, Post, Comments}