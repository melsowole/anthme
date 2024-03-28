import { CreatePostPage } from "./components/CreatePostPage.js";
import * as api from "../api.js";
import { filterCookieValue } from "../utilities/cookieUtils.js";
import { User, Post, Comments } from "../utilities/pathTypes.js";

export default async function displayPostPage(): Promise<void> {
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

  postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let postContent: string = (
      postForm.querySelector(".textarea") as HTMLDivElement
    ).innerText;
    const formData: FormData = new FormData(postForm);
    formData.append("body", postContent);
    const newPost: Post = {} as Post;

    for (const [key, values] of formData) {
      newPost[key] = values;
    }

    try {
      api
        .submitPost(newPost, "post", filterCookieValue("id", "user"))
        .then((createdPost) =>
          window.location.assign(`/posts/${createdPost.id}`)
        );
    } catch (error) {
      console.log(error);
    }

    (postForm.querySelector(".textarea") as HTMLDivElement).innerText = "";
    postForm.reset();
  });
}
