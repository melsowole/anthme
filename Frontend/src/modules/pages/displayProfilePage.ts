/*
* DisplayProfilePage:
*
* `displayProfile` function is responsible for rendering the user profile page.
* It fetches the user's information and displays their username and profile image.
* It retrieves the user's posts and comments and allows navigation between the tabs, posts displays by default.
* Users can delete their own posts and comments directly from the profile page.
* It provides a "Delete Account" button for users to delete their accounts, which logs them out afterward.
* If the user is not found, it displays an error message.
*/

import { main } from "./components/templates/profile-page.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import * as api from "../api.js"
import { deleteCookie, filterCookieValue  } from "../utilities/cookieUtils.js";
import { User } from "../utilities/types.js";
import dayjs from "dayjs";
import {Post, Comment} from "../utilities/types.js"
import { htmlEntitiesToString } from "../utilities/convertToStringUtils.js";
import {DeleteContentBtn} from"./components/DeleteContentBtn.js"
import PageLayout from "./components/PageLayout.js";
import PostPreview from "./components/PostPreview.js"
import CommentFooter from "./components/CommentFooter.js";
import * as rating from "../utilities/footerContentUtils.js"
import { applyUserFeedbackClassToContent } from "../utilities/loggedInUserUtils.js";

async function displayProfile():Promise<void> {
    const profilePage: HTMLElement = stringToDOM(main);

    const pageLayout = new PageLayout();
    await pageLayout.create(profilePage);

    const userInfoContainer = document.querySelector('.user-info') as HTMLDivElement;
    const userPageLinks = document.querySelectorAll('.user-page-link') as NodeListOf<HTMLAnchorElement>;
    const postLinkEl = document.querySelector('.post-link') as HTMLAnchorElement;
    const commentsLinkEl = document.querySelector('.comments-link') as HTMLAnchorElement;
    const container = document.querySelector('.comment-container') as HTMLDivElement;

    const urlParts: string[] = window.location.pathname.split('/');
    const urlPathEndpoint: string = urlParts[urlParts.length - 1];
   
    api.getUserByUsername(urlPathEndpoint)
        .then(async (response) => {
            
            if('statusCode' in response){
                throw new Error("404");

            } else if('id' in response){
                const user: User = response;
                postLinkEl.classList.add('add-grey-bg-color')

                userPageLinks.forEach(userPageLink => {
                    userPageLink.addEventListener('click', () => {
                        handleUserPageLink(userPageLink);
                    });
                });

                displayUserProfile(user, userInfoContainer);
                    const loggedInUserId = filterCookieValue('id', 'user');
                if (user.id === loggedInUserId) {
                    displayDeleteAccountBtn();
                }

                const deleteAccountBtn = document.querySelector('.del-account-btn') as HTMLButtonElement;
            
                postLinkEl.addEventListener('click', handlePostLink);
                commentsLinkEl.addEventListener('click', handleCommentsLink);
                postLinkEl.click();

                if(deleteAccountBtn){
                    deleteAccountBtn.addEventListener('click', handleDeleteAccount);
                }
                
                async function handlePostLink():Promise<void>{
                    container.innerHTML = "";
                
                    const posts = await api.getAllPostsByUser(user.id as string);

                    if(posts.length){
                        for (const post of posts) {
                            container.append(PostPreview.create(post));
                            applyUserFeedbackClassToContent(post);
                        }

                        const postsContainer = document.querySelector('#userHistory') as HTMLDivElement;
                        postsContainer.addEventListener('click', rating.handleFooterContent);
                    } else{
                        container.innerHTML = `
                            <div>No posts...</div>
                        `;
                    }
                }
            
                async function handleCommentsLink():Promise<void>{
                    container.innerHTML = "";
                    const comments = await api.getAllCommentsByUser(user.id as string);

                    if(comments.length){
                        displayContent(container, comments, 'comment')
                        handleDeleteBtn(); 
                    } else {
                        container.innerHTML = `
                        <div>No comments...</div>
                        `;
                    }
                    comments.forEach(applyUserFeedbackClassToContent);
                    const commentsContainer = document.querySelector('#userHistory') as HTMLDivElement;
                    commentsContainer.addEventListener('click', rating.handleFooterContent);
                    
                }
            
                async function handleDeleteAccount(): Promise<void> {
                    const confirmation = confirm('Are you sure that you want to delete your account? This cannot be undone.');
                    if (confirmation) {
                        try {
                            const response = await api.deleteAccount(user.id as string);

                            if('statusCode' in response){
                                throw new Error(response.message);
                            } else{
                                logOut();
                            }

                        } catch(err){
                            alert(err);
                        }
                    }
                }

                function handleUserPageLink(clickedLink: HTMLElement):void {
                    userPageLinks.forEach(link => {
                        link.classList.remove('add-grey-bg-color');
                    });

                    clickedLink.classList.add('add-grey-bg-color');
                }
            }
        })
        .catch(error => {
            if(error.message == "404"){
                const main = document.querySelector("main") as HTMLElement;

                main.innerHTML = `
                    <h1>User not found</h1>
                    <a href="/">Return to homepage</a>
                `;
            } else {
                alert(error)
            }
        });
}

function logOut() {
    deleteCookie("user");
    window.location.href = "/";
}

function displayDeleteAccountBtn():void{
    const userInfoContainer = document.querySelector('.user-info') as HTMLDivElement;
    const deleteAccountBtn = document.createElement('button');
    deleteAccountBtn.innerText = 'Delete account'
    deleteAccountBtn.classList.add('del-account-btn')

    userInfoContainer.append(deleteAccountBtn)
}

function displayUserProfile(user: User, container: HTMLDivElement): void {
    container.innerHTML = "";
    const userInfo = document.createElement('div');
    const userNameEl = document.createElement('h2');
    userNameEl.innerText = user.username;

    const userImageUrl = user.userImage 
    const userImage = new Image();
    userImage.src = userImageUrl;

    userInfo.append(userImage, userNameEl)
    container.append(userInfo);
}


function handleDeleteBtn():void {
    const deleteBtns = document.querySelectorAll('.delete-btn') as NodeListOf<HTMLButtonElement>;
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', async (event) => {

            event.stopPropagation();
            const container = (event.target as HTMLElement).closest('.profile-item') as HTMLElement;
            const containerId = container.id;
            const loggedInUserId = filterCookieValue('id', 'user')

            try{
                if(deleteBtn.classList.contains('post')){
                    const response = await api.deletePost(loggedInUserId, containerId);

                    if('statusCode' in response) throw new Error(response.message)
        
                } else{
                    const commentObj = await api.getComment(containerId)
                    const response = await api.deleteComment(commentObj.postId, loggedInUserId, commentObj.id)

                    if('statusCode' in response) throw new Error(response.message)
                }
                container.remove();
            } catch(err){
                alert(err);
            }
        });
    });
}

function displayContent(container: HTMLElement, items: (Post | Comment)[], typeOfContent:string) {
    container.innerHTML = "";

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('comment-item', 'profile-item', 'content-container');
        itemElement.id = item.id;
        const commentWrapper = document.createElement('div');
        commentWrapper.classList.add('comment-wrapper')

        const timeStampEl = document.createElement('small');
        timeStampEl.classList.add('timestamp-el');
        timeStampEl.innerText = dayjs(item.created).fromNow()
       
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img-div');

        const itemBody = document.createElement('div');
        itemBody.classList.add('comment-body');

        const userImg = document.createElement('img')
        userImg.src = item.user.userImage;

        const usernameEl = document.createElement('h2');
        usernameEl.innerText = item.user.username;

        if ('title' in item) {
            const titleEl = document.createElement('h2');
            titleEl.classList.add('post-title');
            titleEl.innerText =item.title;
            itemBody.appendChild(titleEl);
        }
        
        const contentEl = document.createElement('div');
        contentEl.innerHTML = htmlEntitiesToString(item.body);

         const loggedInUserId = filterCookieValue('id', 'user');
         if (item.user.id === loggedInUserId) {
            const deleteBtn = DeleteContentBtn.create(typeOfContent);
            commentWrapper.append(imgDiv, deleteBtn);
        } 
         else commentWrapper.append(imgDiv, usernameEl);
        
        itemBody.append(contentEl, CommentFooter.create(item.rating));
        imgDiv.append(timeStampEl, usernameEl, userImg);
        itemElement.append(commentWrapper, itemBody);
        

        container.append(itemElement);
    });

}


export{displayProfile, displayUserProfile}
