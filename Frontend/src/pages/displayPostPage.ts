import { renderPostPage } from "../components/PostPage.js";
import { submitPost } from "../modules/api.js";
import { filterCookieValue } from "../modules/cookieUtils.js";

function displayPostPage(): void {
    const textContentArray:string[] = [
        'Remember the human',
        'Behave like you would in real life',
        'Look for the original source of content',
        'Search for duplicates before posting',
        `Read the community's rules`
    ];
    renderPostPage('Posting to anthme', textContentArray)

    const postForm = document.querySelector('#postForm') as HTMLFormElement;
    postForm.addEventListener('submit', event => {
        event.preventDefault();
        let postContent:string = (postForm.querySelector('.textarea') as HTMLDivElement).innerText;
        const formData: FormData = new FormData(postForm);
        formData.append('body', postContent);
        const newPost: Object = {};

        for(const [key, values] of formData) {
            newPost[key] = values;
        }
        console.log(newPost);

        try {
            submitPost(newPost, 'post', filterCookieValue('id', 'user'))
        }
        catch(error) {
            console.log(error);
        }

        (postForm.querySelector('.textarea') as HTMLDivElement).innerText = '';
        postForm.reset();
    })

}

export default displayPostPage