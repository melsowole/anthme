import { main } from "./components/templates/viewPostpage.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js";
import MainNav from "./components/MainNav.js";
import { getPost, getComments, submitPost } from "../api.js";
import dayjs from "dayjs";
import { filterCookieValue } from "../utilities/cookieUtils.js";
import * as userImg from "../utilities/userImgUtils.js";
import { generateDropdowns } from "../utilities/dropdownUtils.js";
import { Post, Comment, User } from "../utilities/pathTypes.js";
import { htmlEntitiesToString } from "../utilities/stringUtils.js";

let specificComments: Comment[] = [];

async function displayViewPostPage(): Promise<void> {
  const mainNavDropdowns = await generateDropdowns();

  const viewPostpage: HTMLElement = stringToDOM(main);
  const header = Header.create();
  const mainNav = MainNav.create(mainNavDropdowns);

  document.body.append(viewPostpage, header, mainNav);

  const urlParts: string[] = window.location.pathname.split("/");
  const urlPathEndpoint: string = urlParts[urlParts.length - 1];
  
  getPost(urlPathEndpoint)
    .then((post) => {
      const userInfoContainer = document.querySelector(
        ".userInfoContainer"
      ) as HTMLDivElement;
      const postCommentsIds = post.comments;

      displayUserProfile(userInfoContainer, post, userImg);

      getComments()
        .then((comments) => {
          specificComments = comments.filter((comment) =>
            postCommentsIds.includes(comment.id)
          );
          console.log(specificComments)
          const commentDiv = document.querySelector(
            ".commentInfo"
          ) as HTMLDivElement;

          for (const comment of specificComments) {
            displayCommentsOnPost(
              commentDiv,
              comment,
              specificComments,
              userImg
            );
          }
        })
 
      const commentForm = document.querySelector(
        ".commentForm"
      ) as HTMLFormElement;

      commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const commentInput = document.querySelector(
            ".commentInput"
        ) as HTMLTextAreaElement;
        const commentValue = commentInput.value;
    
        const newComment = {
            body: commentValue,
        };
    
        if (event.submitter && event.submitter.id === "addCommentBtn") {
          const loggedInUserId = filterCookieValue("id", "user");
          submitPost(newComment, "comment", loggedInUserId, post.id)
          .then((result: Post | Comment | User) => {
            if ('postId' in result) {
                const newlyCreatedComment = result as Comment;
                
                console.log(newlyCreatedComment);
                specificComments.push(newlyCreatedComment);
                const commentDiv = document.querySelector(
                    ".commentInfo"
                ) as HTMLDivElement;
                displayCommentsOnPost(commentDiv, newlyCreatedComment, specificComments, userImg);
                updateAmountOfComments();
            } else {
            
                console.log("Received data of unknown type:", result);
            }
        })
        
      }
      
        commentForm.reset();
    });
    
    
      const addCommentBtn = document.querySelector(
        ".addCommentBtn"
      ) as HTMLButtonElement;
      const textareaContainer = document.querySelector(
        ".textareaContainer"
      ) as HTMLTextAreaElement;
      const cancelBtn = document.querySelector(
        ".cancelButton"
      ) as HTMLButtonElement;

      addCommentBtn.addEventListener("click", handleAddCommentBtn);
      cancelBtn.addEventListener("click", handleCancelBtn);

      function handleAddCommentBtn(): void {
        textareaContainer.classList.remove("hide");
      }
      function handleCancelBtn(event: Event): void {
        event.preventDefault();
        textareaContainer.classList.add("hide");
        commentForm.reset();
      }
    })

    .catch((error) => {
      console.error("Error fetching post:", error);
    });
}

    function displayUserProfile(container: HTMLElement, item: (Post), userImg: Record<string, string>):void {
        
        const userInfoContainer = document.querySelector('.userInfoContainer') as HTMLDivElement;
        const contentDiv = document.querySelector('.contentDiv') as HTMLDivElement;
        const userInfoItem = document.querySelector('.userInfoItem') as HTMLDivElement;
        const userImgContainer = document.querySelector('.userImgContainer') as HTMLImageElement;

        if (item.user.userImage === 'pizza') {
            displayUserImage(userImgContainer, userImg.pizza);
        } else if (item.user.userImage === 'donut') {
            displayUserImage(userImgContainer, userImg.donut);
        } else {
            displayUserImage(userImgContainer, userImg.banana);
        }
        
        const categoryEl = document.createElement('p');
        categoryEl.innerText = item.category;
        categoryEl.id = 'categoryTitle'
        const usernameEl = document.createElement('p')
        usernameEl.innerText = `u/${item.user.username}`;
        usernameEl.classList.add('username')
        const titleEl = document.createElement('h2');
        titleEl.innerText = item.title;
        const contentEl = document.createElement('div');
        contentEl.innerHTML = htmlEntitiesToString(item.body);

        contentDiv.append(titleEl, contentEl)
        userInfoItem.append(usernameEl, categoryEl)
        userInfoContainer.append(userInfoItem)

        container.append(userInfoItem);
    
    }

    function displayCommentsOnPost(container: HTMLElement, item: Comment, specificComments: Comment[], userImg: Record<string, string>):void {
        
        const ammountOfComments = document.querySelector('.amountOfComments') as HTMLSpanElement;
        ammountOfComments.innerText = specificComments.length.toString(); 
                        
        const commentItem= document.createElement('div');
        commentItem.classList.add('commentItem')
        const timeStampEl = document.createElement('small');
        timeStampEl.classList.add('timeStampEl')
        timeStampEl.innerText = dayjs(item.user.created).format('DD MMMM YYYY');
        

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('imgDiv');
        const commentBody = document.createElement('div');
        commentBody.classList.add('commentBody')
        const usernameEl = document.createElement('h2')
        usernameEl.innerText= item.user.username;
        const contentEl = document.createElement('div');
        contentEl.innerHTML = htmlEntitiesToString(item.body);

        if (item.user.userImage === 'pizza') {
            displayUserImage(imgDiv, userImg.pizza);
        } 
        else if (item.user.userImage === 'donut') {
            displayUserImage(imgDiv, userImg.donut);
        } 
        else  displayUserImage(imgDiv, userImg.banana);
            
        commentBody.append(usernameEl, contentEl);
        imgDiv.append(timeStampEl, usernameEl);

        commentItem.append(imgDiv, commentBody);

        container.append(commentItem);
    }


    function displayUserImage(container: HTMLDivElement, imgPath: string): void {
    const imgEl = document.createElement("img");
    imgEl.src = imgPath;
    imgEl.classList.add("userImg");

    container.appendChild(imgEl);
}

function updateAmountOfComments() {
    const ammountOfComments = document.querySelector('.amountOfComments') as HTMLSpanElement;
    ammountOfComments.innerText = specificComments.length.toString(); 
}

export { displayViewPostPage, displayUserImage };
