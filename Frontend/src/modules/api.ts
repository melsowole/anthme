import { User, Post, Comments } from "./utilities/pathTypes";

const baseUrl: string = 'http://localhost:3000/';
const header = {"Content-type": "application/json; charset=UTF-8"};

async function getAllUsers():Promise<User[]>{
    const url = baseUrl + 'users/';

    const res = await fetch(url);
    const users = await res.json();
    console.log(users);
    return users;
}

 async function getPost(id: string):Promise<Post>{

    const url = baseUrl + `posts/${id}`;
    console.log(url)

    const res = await fetch(url);
    const post = await res.json();
    return post;
} 

async function getComments(): Promise<Comments[]> {
    const url = baseUrl + 'comments';
    const res = await fetch(url);
    const comments = await res.json();
    return comments;
}

async function submitPost<T extends User | Post | Comments>(createdObject:T, typeOfPost:string, userId?:string, postId?:string): Promise<T> {
    let url: string = baseUrl;
    if(typeOfPost === 'user') url += `users`;
    else if(typeOfPost === 'post') url += `users/${userId}/posts`;
    else if(typeOfPost === 'comment') url += `posts/${postId}/users/${userId}/comments`;
    console.log(url);

    const options = {
        method: "POST",
        body: JSON.stringify(createdObject),
        headers: header
    }

    const res = await fetch(url, options);
    const info = await res.json();
    console.log(info);
    return info;
}

async function sendLogInRequest(username:string, password:string): Promise<void> {
    const url = `${baseUrl}user/login`;

    const user = {
        username: username,
        password: password
    }

    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(user),
        headers: header,
        mode: 'cors',
        credentials: 'include'
    }

    const res = await fetch(url, options);
    const info = await res.json();
    window.location.replace('http://localhost:1234/')
}

async function readCookie(): Promise<boolean> {
    const req = new Request(`${baseUrl}read-cookie`, {
        mode: 'cors',
        credentials: 'include'
    })

    const res = await fetch(req);
    const cookieInfo = await res.json();
    return cookieInfo.ok;
}

export {submitPost, getAllUsers, readCookie, sendLogInRequest, getPost, getComments}