import { CreatePostPage } from "./components/CreatePostPage.js";
import * as api from "../api.js";
import { filterCookieValue } from "../utilities/cookieUtils.js";
import { User, Post, Comments } from "../utilities/pathTypes.js";

export default async function displayCreatePostPage(): Promise<void> {
    const textContentArray: string[] = [
        "Remember the human behind the screen",
        "Behave like you would in real life",
        "Look for the original source of content",
        "Search for duplicates before posting",
        `Read the community's rules`,
    ];
    const categories = await api.getCategories();
    CreatePostPage.create(categories, "Posting to anthme", textContentArray);

    const postForm = document.querySelector("#postForm") as HTMLFormElement;
    postForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let postContent: string = (postForm.querySelector(".ql-editor") as HTMLDivElement).innerHTML;

        const formData: FormData = new FormData(postForm);
        formData.append("body", postContent);

        const newPost: Partial<Post> = {};

        for (const [key, values] of formData) {
            newPost[key] = values;
        }

        if(checkFormValidity()) {
            try {
                const createdPost = await api.submitPost(newPost, "post", filterCookieValue("id", "user"))
                window.location.assign(`/posts/${createdPost.id}`)
            }
            catch (error) {
                console.log(error);
            }
        }

        (postForm.querySelector(".ql-editor") as HTMLDivElement).innerHTML = "";
        postForm.reset();
    });

    // Can see it as a listener on DOM changes for div contentEditable
    const target = postForm.querySelector('.ql-editor') as HTMLDivElement;
    const observer = new MutationObserver(handleDivContentEditableChanges);
    const config = { childList: true, subtree: true }
    observer.observe(target, config)

    // Checking if checkFormValidity is true or false on all input change
    const formInputs = postForm.querySelectorAll('.check-form-validity');
    formInputs.forEach(element => {
        element.addEventListener('input', checkFormValidity)
    })

    function checkFormValidity(): boolean {
        const submitBtn = postForm.querySelector('.submit-btn') as HTMLButtonElement;

        // Checking values in input, select and div with contentEditable
        const allInputsHasValue = Array.from(formInputs).every(element => {
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
            return element.value.trim() !== "";
        }
        else if (element instanceof HTMLDivElement && element.contentEditable === "true") {
            return hasContent(element);
        }
        return false;
        });
        
        if (allInputsHasValue) submitBtn.classList.add('highlight-submit-btn');
        else submitBtn.classList.remove('highlight-submit-btn');

        return allInputsHasValue;
    }

    // Returns true if either image exists or text has content
    function hasContent(element: HTMLElement): boolean {
        const hasImages = !!element.querySelector('img'); // !! = convert truthy or false value to a boolean
        const hasIframes = !!element.querySelector('.ql-video');
        const hasTextContent = element.textContent?.trim() !== '';
        
        return hasTextContent || hasImages || hasIframes;
    }

    // Listens for DOM changes such as <img> or <iframe> and checks form validity
    function handleDivContentEditableChanges(records: MutationRecord[], observer: MutationObserver): void {
        for (const record of records) {

            for (const addedNode of record.addedNodes) {
                if(addedNode.textContent && addedNode.textContent.trim() === '') {
                    checkFormValidity();
                }
            }
            
            if(record.removedNodes.length > 0) checkFormValidity();
        }
    }
}

