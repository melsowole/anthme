import { main } from "./components/templates/viewPostpage.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js";
import MainNav from "./components/MainNav.js";
import { getPost, getComments, submitPost } from "../api.js";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { filterCookieValue } from "../utilities/cookieUtils.js";
import { generateDropdowns } from "../utilities/dropdownUtils.js";
import { Post, Comment } from "../utilities/pathTypes.js";
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
      if('statusCode' in post) {
        // if post not found
        throw new Error("404");

      } else if ('id' in post){
        const userInfoContainer = getElement(".userInfoContainer");

        const postCommentsIds = post.comments;

        displayUserProfile(userInfoContainer, post, post.user.userImage);

        getComments()
          .then((comments) => {
            specificComments = comments.filter((comment) =>
              postCommentsIds.includes(comment.id)
            );
            
            if(specificComments.length == 0){
              // if post has no comments
              throw new Error("204");
            }

            const commentDiv = getElement(".commentInfo");

            for (const comment of specificComments) {
              displayCommentsOnPost(
                commentDiv,
                comment,
                specificComments,
              );
            }
            
          }) 
          .catch((error) => {
            if(error.message == "204"){
              const noComments = document.createElement("p");
              noComments.textContent = "No Comments yet..."
              const commentsContainer = getElement(".commentInfo");
              commentsContainer.append(noComments);

            } else {
              alert(error);
            }
          });

        // Add comment functionality
        const commentForm = getElement(".commentForm") as HTMLFormElement;
        
        commentForm.addEventListener("submit", async (event) => {
          event.preventDefault();
          const commentInput = getElement(".commentInput") as HTMLTextAreaElement;
          const commentValue = commentInput.value;

          const newComment = {
            body: commentValue,
          };

          if (event.submitter && event.submitter.id === "addCommentBtn") {
            const loggedInUserId = filterCookieValue("id", "user");

            try {
              const response = await submitPost(newComment, "comment", loggedInUserId, post.id);

              if('id' in response){
                // comment submit success
                const addedComment = response as Comment;
                specificComments.push(addedComment);
                console.log(specificComments)
                const commentDiv = getElement(".commentInfo");
                displayCommentsOnPost(commentDiv, addedComment, specificComments);
                updateAmountOfComments();

                commentForm.reset();

              } else if('statusCode' in response){
                throw new Error(response.message);

              } else {
                throw new Error("Unexpected error. Try again later!")
              }
            } catch(err){
              alert(err)
            }
          }
        });

        const addCommentBtn = getElement(".addCommentBtn") as HTMLButtonElement;
        const textareaContainer = getElement(".textareaContainer") as HTMLTextAreaElement;
        const cancelBtn = getElement(".cancelButton") as HTMLButtonElement;

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
      }
    }) 
    .catch((error) => {
      if(error.message == "404"){
        const main = getElement("main");
        main.innerHTML = `
          <h1>Post not found</h1>
          <a href="/">Return to home page</a>
        `;

      } else {
        alert(error)
      }
    });
}

function displayUserProfile(container: HTMLElement, item: (Post), userImg: string):void {
    
  const userInfoContainer = getElement('.userInfoContainer');
  const contentDiv = getElement('.contentDiv');
  const userInfoItem = getElement('.userInfoItem');
  const userImgContainer = getElement('.userImgContainer') as HTMLImageElement;


  displayUserImage(userImgContainer, userImg);
  
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

function displayCommentsOnPost(container: HTMLElement, item: Comment, specificComments: Comment[]):void {
  const ammountOfComments = document.querySelector('.amountOfComments') as HTMLSpanElement;
  ammountOfComments.innerText = specificComments.length.toString(); 
                  
  const commentItem= document.createElement('div');
  commentItem.classList.add('commentItem')
  const timeStampEl = document.createElement('small');
  timeStampEl.classList.add('timeStampEl')
  timeStampEl.innerText = dayjs(item.created).fromNow()

  const imgDiv = document.createElement('div');
  imgDiv.classList.add('imgDiv');
  const commentBody = document.createElement('div');
  commentBody.classList.add('commentBody')
  const usernameEl = document.createElement('h2')
  usernameEl.innerText= item.user.username;
  const contentEl = document.createElement('div');
  contentEl.innerHTML = htmlEntitiesToString(item.body);

  displayUserImage(imgDiv, item.user.userImage);
      
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

function getElement(selector:string): HTMLElement{
  return document.querySelector(selector) as HTMLElement;
}

export { displayViewPostPage, displayUserImage };
