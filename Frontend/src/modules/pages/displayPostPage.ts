/*

* DisplayPostPage
*
* `displayViewPostPage` is responsible for rendering the header, navigation, and main content of the page.
* It fetches the post info and renders the user profile and comments associated with the post.
* Users can add comments to the post, and the page updates dynamically to reflect the new comment.
*Users can upvote and downvote. 
* If the post is not found, it displays an error message.

*/

import * as template from "./components/templates/post-page.js";
import { replace, stringToDOM } from "../utilities/templateUtils.js";
import * as api from "../api.js";
import dayjs from "dayjs";
//import relativeTime from 'dayjs/plugin/relativeTime';
import { filterCookieValue } from "../utilities/cookieUtils.js";
import { Post, Comment } from "../utilities/types.js";
import { htmlEntitiesToString } from "../utilities/convertToStringUtils.js";
import * as rating from "../utilities/ratingUtils.js";
import { applyUserRatingClassToPost } from "../utilities/loggedInUserUtils.js";
import PageLayout from "./components/PageLayout.js";

let postComments: Comment[] = [];

async function displayViewPostPage(): Promise<void> {
  const urlParts: string[] = window.location.pathname.split("/");
  const urlPathEndpoint: string = urlParts[urlParts.length - 1];
  
  await api.getPost(urlPathEndpoint)
    .then(async (post) => {
      if('statusCode' in post) {
        // if post not found
        throw new Error("404");

      } else if ('id' in post){
        const postPageTemplate = replace(template.postPage, [
          {pattern: "postId", replacement: post.id},
          {pattern: "rating", replacement: (post.rating.upvotes.length - post.rating.downvotes.length).toString()}
        ]);
        const postPage: HTMLElement = stringToDOM(postPageTemplate);
        
        const pageLayout = new PageLayout();
        await pageLayout.create(postPage);

    
        applyUserRatingClassToPost(post);

        const userInfoContainer = getElement(".user-info-container");
        const postCommentsIds = post.comments;
        displayUserProfile(userInfoContainer, post, post.user.userImage);

        await api.getAllComments()
          .then((comments) => {
            postComments = comments.filter((comment) =>
              postCommentsIds.includes(comment.id)
            );
            
            if(postComments.length == 0){
              // if post has no comments
              throw new Error("204");
            }

            const commentDiv = getElement(".comment-info");

            for (const comment of postComments) {
              displayCommentsOnPost(
                commentDiv,
                comment,
                postComments,
              );
            }
            
          }) 
          .catch((error) => {
            if(error.message == "204"){
              const noComments = document.createElement("p");
              noComments.textContent = "No Comments yet..."
              const commentsContainer = getElement(".comment-info");
              commentsContainer.append(noComments);

            } else {
              alert(error);
            }
          });

          const postFooter = getElement('.interaction-container') as HTMLDivElement;
          postFooter.addEventListener('click', async (event) => {
            const {target} = event;

            if(!(target instanceof HTMLElement)) return; // Narrow down the types on target so it won't complain

            if(target.closest('.outer-span')) {
              event.preventDefault();
              const postContainer = target.closest('.post-container') as HTMLDivElement;
              const loggedInUserId = filterCookieValue('id', 'user');
              

              if(target.closest('.button-up')) {
                  await api.updateUpvotes(post.id, loggedInUserId)
                      .then(postRating => {
                          rating.updateRating(postRating, postContainer);
                          rating.updateBGColor(target);
                      });
              }
              else if(target.closest('.button-down')) {
                  await api.updateDownvotes(post.id, loggedInUserId)
                      .then(postRating => {
                          rating.updateRating(postRating, postContainer);
                          rating.updateBGColor(target);
                      });
              }
            }
            // Add logic for Share button on post
            else return;     
          });

          // Add comment functionality
          const commentForm = getElement(".comment-form") as HTMLFormElement;
          
          commentForm.addEventListener("submit", async (event) => {
          event.preventDefault();
          const commentInput = getElement(".comment-input") as HTMLTextAreaElement;
          const commentValue = commentInput.value;

          const newComment = {
            body: commentValue,
          };

          if (event.submitter && event.submitter.id === "add-comment-btn") {
            const loggedInUserId = filterCookieValue("id", "user");

            try {
              const response = await api.sendDataToServer(newComment, "comment", loggedInUserId, post.id);

              if('id' in response){
                // comment submit success
                const addedComment = response as Comment;
                postComments.push(addedComment);
                const commentDiv = getElement(".comment-info");
                displayCommentsOnPost(commentDiv, addedComment, postComments);
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

        const addCommentBtn = getElement(".add-comment-btn") as HTMLButtonElement;
        const textareaContainer = getElement(".textarea-container") as HTMLTextAreaElement;
        const cancelBtn = getElement(".cancel-button") as HTMLButtonElement;

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
    
  const userInfoContainer = getElement('.user-info-container');
  const contentDiv = getElement('.content-div');
  const userInfoItem = getElement('.user-info-item');
  const userImgContainer = getElement('.user-img-container') as HTMLImageElement;


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
  const ammountOfComments = document.querySelector('.amount-of-comments') as HTMLSpanElement;
  ammountOfComments.innerText = specificComments.length.toString(); 
                  
  const commentItem= document.createElement('div');
  commentItem.classList.add('comment-item')
  const timeStampEl = document.createElement('small');
  timeStampEl.classList.add('timestamp-el')
  timeStampEl.innerText = dayjs(item.created).fromNow()

  const imgDiv = document.createElement('div');
  imgDiv.classList.add('img-div');
  const commentBody = document.createElement('div');
  commentBody.classList.add('comment-body')
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
  imgEl.classList.add("user-img");

  container.appendChild(imgEl);
}

function updateAmountOfComments() {
  const ammountOfComments = document.querySelector('.amount-of-comments') as HTMLSpanElement;
  ammountOfComments.innerText = postComments.length.toString(); 
}

function getElement(selector:string): HTMLElement{
  return document.querySelector(selector) as HTMLElement;
}

export { displayViewPostPage, displayUserImage };
