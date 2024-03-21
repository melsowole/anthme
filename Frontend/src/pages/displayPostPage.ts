import { PostForm } from "../templates/components/PostForm.ts";
import {Noticeboard} from "../templates/components/Noticeboard.ts"
import { submitPost } from "../modules/api.ts";

function displayPostPage(): void {
    const postContainerEl = PostForm.createDOM();
    
    const textContentArray:string[] = [
        'Remember the human',
        'Behave like you would in real life',
        'Look for the original source of content',
        'Search for duplicates before posting',
        `Read the community's rules`
    ];
    
    const noticeboardEl = Noticeboard.createDOM('Posting to anthme', textContentArray);
    
    document.body.append(postContainerEl)
    postContainerEl.append(noticeboardEl)

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

}

export default displayPostPage