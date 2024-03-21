import { PostForm } from "../templates/components/PostForm.ts";
import {Noticeboard} from "../templates/components/Noticeboard.ts"

function displayPostPage(): void {
    const mainContainer = document.querySelector('#mainContainer') as HTMLDivElement;
    const postContainerEl = PostForm.createDOM();
    
    const textContentArray:string[] = [
        'Remember the human',
        'Behave like you would in real life',
        'Look for the original source of content',
        'Search for duplicates before posting',
        `Read the community's rules`
    ];

    const noticeboardEl = Noticeboard.createDOM('Posting to anthme', textContentArray);

    mainContainer.append(postContainerEl, noticeboardEl)
}

export default displayPostPage