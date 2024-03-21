import { router } from "./modules/router.ts";
import { submitPost } from "./modules/api.ts";

router.resolve();

const postForm = document.querySelector('#postForm') as HTMLFormElement;
postForm.addEventListener('submit', event => {
    event.preventDefault();
    let postContent:string = (postForm.querySelector('.textarea') as HTMLDivElement).innerText;
    const formData: FormData = new FormData(postForm);
    formData.append('body', postContent);
    const newPost: Object = {
        username: "Frontend",
        userImage: "randomimg.png"
    };

    for(const [key, values] of formData) {
        newPost[key] = values;
    }
    console.log(newPost);

    try {
        submitPost(newPost, 'post', "66f2236a-0b65-45bc-8be7-86009cf8188a")
    }
    catch(error) {
        console.log(error);
    }

    (postForm.querySelector('.textarea') as HTMLDivElement).innerText = '';
    postForm.reset();
})

