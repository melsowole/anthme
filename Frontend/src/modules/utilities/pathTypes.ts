type Error = {
  statusCode: number;
  message: string;
}

type Success = {
  message: string;
}

type User = {
  id: string;
  username: string;
  password: string;
  userImage: string;
  posts: string[];
  comments: string[];
  created?: number;
};

type Post = {
  id: string;
  category: string;
  title: string;
  body: string;
  created: string;
  comments: string[];
  user: {
    id: string;
    username: string;
    userImage: string;
  };
};

type Comment = {
  id: string;
  body: string;
  created: string;
  postId:string;
  user: {
    id: string;
    created: string;
    username: string;
    userImage: string;
  };
};

type Category = {
  name: string;
  color: string;
  icon: string;
  category: string;
};

type MainCategory = {
  label: string;
  id: string;
  items: SubCategory[];
};

type SubCategory = {
  name: string;
  url: string;
};

export {Error, Success, User, Post, Comment, Category, MainCategory };
