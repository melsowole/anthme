import { renderCreatePostPage } from "./components/CreatePostPage.js";
import { submitPost } from "../api.js";
import { filterCookieValue } from "../utilities/cookieUtils.js";

export default function displayCreatePostPage(): void {
  const textContentArray: string[] = [
    "Remember the human",
    "Behave like you would in real life",
    "Look for the original source of content",
    "Search for duplicates before posting",
    `Read the community's rules`,
  ];
  renderCreatePostPage("Posting to Anthme", textContentArray);

  const postForm = document.querySelector("#postForm") as HTMLFormElement;
  postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let postContent: string = (
      postForm.querySelector(".textarea") as HTMLDivElement
    ).innerText;
    const formData: FormData = new FormData(postForm);
    formData.append("body", postContent);
    const newPost: Object = {};

    for (const [key, values] of formData) {
      newPost[key] = values;
    }

    try {
      submitPost(newPost, "post", filterCookieValue("id", "user"));
    } catch (error) {
      console.log(error);
    }

    (postForm.querySelector(".textarea") as HTMLDivElement).innerText = "";
    postForm.reset();
  });
}
