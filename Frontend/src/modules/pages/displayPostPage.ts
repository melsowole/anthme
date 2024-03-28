import { main } from "./components/templates/viewPostpage.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js";
import MainNav from "./components/MainNav.js";
import { getAllUsers, getPost, getComments, submitPost } from "../api.js";
import { displayUserProfile } from "./displayProfilePage.js";
import dayjs from "dayjs";
import * as userImg from "../utilities/userImgUtils.js";
import UserProfile from "./components/UserProfile.js";

function displayViewPostPage(): void {
  const viewPostpage: HTMLElement = stringToDOM(main);
  const header = Header.create();
  const mainNav = MainNav.create();

  document.body.append(viewPostpage, header, mainNav);

  // Get URL:s post id
  const urlParts: string[] = window.location.pathname.split("/");
  const urlPathEndpoint: string = urlParts[urlParts.length - 1];
  console.log(urlParts);
  console.log(urlPathEndpoint);

  getPost(urlPathEndpoint)
    .then((post) => {
      const postCommentsIds = post.comments;
      const titleDiv = document.querySelector(".titleDiv") as HTMLDivElement;
      const userInfoItem = document.querySelector(
        ".userInfoItem"
      ) as HTMLDivElement;
      const commentDiv = document.querySelector(
        ".commentInfo"
      ) as HTMLDivElement;
      const categoryEl = document.createElement("p");
      categoryEl.innerText = `u/${post.category}`;
      const titleEl = document.createElement("h2");
      titleEl.innerText = post.title;

      console.log(post);

      titleDiv.append(titleEl);
      // TODO: THREAD STARTER HEAD
      userInfoItem.append(
        UserProfile.createCommentProfile(
          post.user.username,
          post.user.userImage,
          post.created
        )
      );

      // Hämta alla kommentarer
      getComments()
        .then((comments) => {
          // Filtrera kommentarerna för att endast inkludera de som har ID:n som finns i inläggets kommentarslista
          const specificComments = comments.filter((comment) =>
            postCommentsIds.includes(comment.id)
          );

          for (const comment of specificComments) {
            const ammountOfComments = document.querySelector(
              ".amountOfComments"
            ) as HTMLSpanElement;
            ammountOfComments.innerText = specificComments.length.toString();

            const commentItem = document.createElement("div");
            commentItem.classList.add("commentItem");

            const imgDiv = UserProfile.createCommentProfile(
              comment.user.username,
              comment.user.userImage,
              comment.created
            );

            const commentBody = document.createElement("div");
            commentBody.classList.add("commentBody");
            const usernameEl = document.createElement(
              "h2"
            ) as HTMLHeadingElement;
            const contentEl = document.createElement("p");
            contentEl.innerText = comment.body;

            commentBody.append(usernameEl, contentEl);
            imgDiv.append(usernameEl);

            commentItem.append(imgDiv, commentBody);
            commentDiv.append(commentItem);
          }
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
    });

  const addCommentBtn = document.querySelector(
    ".addCommentBtn"
  ) as HTMLButtonElement;
  const textareaContainer = document.querySelector(
    ".textareaContainer"
  ) as HTMLTextAreaElement;
  addCommentBtn.addEventListener("click", () => {
    textareaContainer.classList.remove("hide");
  });

  const commentForm = document.querySelector(".commentForm") as HTMLFormElement;
  const cancelBtn = document.querySelector(
    ".cancelButton"
  ) as HTMLButtonElement;
  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    textareaContainer.classList.add("hide");
    commentForm.reset();
  });

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const commentInput = document.querySelector(
      ".commentInput"
    ) as HTMLTextAreaElement;
    const commentValue = commentInput.value;
    console.log(commentValue);
    const newComment = {
      body: commentValue,
    };
    if (event.submitter && event.submitter.id === "addCommentBtn") {
      submitPost(
        newComment,
        "comment",
        "38e33fa3-cdb8-495b-9e8f-cf28fc9d3201",
        "37887b4d-bc3b-43fe-83ca-aeceb63bee13"
      );
    }

    commentForm.reset();
  });
  getAllUsers()
    .then((users) => {
      const userInfoContainer = viewPostpage.querySelector(
        ".userInfoItem"
      ) as HTMLDivElement;

      const userId = "ae98fe9d-fdfa-4755-9f03-30e1a8e49eef";

      const user = users.find((user) => user.id === userId);
      if (user) {
        console.log(user.posts);
        displayUserProfile(user, userInfoContainer);

        const imgEl = viewPostpage.querySelector("img") as HTMLImageElement;
      } else {
        console.log(`Ingen användare hittades med ID: ${userId}`);
      }
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

export { displayViewPostPage, displayUserImage };
