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
    user: {
        id: string,
        username: string,
        userImage: string
    }
} 

type Comments = {
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

type Category = {
    name: string,
    color: string,
    icon: string,
    category: string
}

type MainCategory = {
    label: string;
    id: string;
    items: SubCategory[];
  }
  
  type SubCategory = {
    name: string;
    url: string;
  }

export {User, Post, Comments, Category, MainCategory}