const baseUrl: string = 'http://localhost:3000/';
const header = {"Content-type": "application/json; charset=UTF-8"};

async function submitPost(createdObject:Object, typeOfPost:string, userId?:string, postId?:string): Promise<void> {
    let url: string = baseUrl;
    if(typeOfPost === 'user') url += `users`;
    else if(typeOfPost === 'post') url += `user/${userId}/posts`;
    else if(typeOfPost === 'comment') url += `posts/${postId}/user/${userId}/comment`;
    console.log(url);

    const options = {
        method: "POST",
        body: JSON.stringify(createdObject),
        headers: header
    }

    const res = await fetch(url, options);
    const info = await res.json();
    console.log(info);
    
}

export {submitPost}