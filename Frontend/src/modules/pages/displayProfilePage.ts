/*

DisplayProfilePage:

* `displayProfile` function is responsible for rendering the user profile page.
* It fetches the user's information and displays their username and profile image.
* It retrieves the user's posts and comments and allows navigation between them.
* Users can delete their own posts and comments directly from the profile page.
* It provides a "Delete Account" button for users to delete their accounts, which logs them out afterward.
* If the user is not found, it displays an error message.
* `displayUserProfile` function displays the user's profile information (username and their selected userImage).

*/

import { main } from "./components/templates/profile-page.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js"
import MainNav from "./components/MainNav.js";
import Sidebar from "./components/Sidebar.js";
import UserNoticeboard from "./components/UserNoticeboard.js";
import * as userImg from "../utilities/userImgUtils.js"
import * as api from "../api.js"
import { deleteCookie, filterCookieValue  } from "../utilities/cookieUtils.js";
import { User } from "../utilities/types.js";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import {displayUserImage} from "./displayPostPage"
import {Post, Comment} from "../utilities/types.js"
import { generateDropdowns } from "../utilities/dropdownUtils.js";
import { htmlEntitiesToString } from "../utilities/stringUtils.js";
import {DeleteContentBtn} from"./components/DeleteContentBtn.js"


async function displayProfile():Promise<void> {
    const mainNavDropdowns = await generateDropdowns();
    const profilepage: HTMLElement = stringToDOM(main);
    const header = Header.create();
    const mainNav = MainNav.create(mainNavDropdowns);
    const sidebar = Sidebar.create([await (UserNoticeboard.create())])
  
    document.body.append(
        header,
        mainNav,
        profilepage,
        sidebar
    )

    const userInfoContainer = profilepage.querySelector('.userInfo') as HTMLDivElement;
    const userPageLinks = profilepage.querySelectorAll('.userPageLink') as NodeListOf<HTMLAnchorElement>;
    const postLink = document.querySelector('.postLink') as HTMLAnchorElement;
    const commentsLink = document.querySelector('.commentsLink') as HTMLAnchorElement;
    const container = document.querySelector('.commentContainer') as HTMLDivElement;

    const urlParts: string[] = window.location.pathname.split('/');
    const urlPathEndpoint: string = urlParts[urlParts.length - 1];
   
    api.getUserByUsername(urlPathEndpoint)
        .then(async (response) => {

            if('statusCode' in response){
                throw new Error("404");

            } else if('id' in response){
                const user: User = response;
                postLink.classList.add('addGreyBGColor')

                const posts = await api.getPostByUser(user.id as string);

                userPageLinks.forEach(userPageLink => {
                    userPageLink.addEventListener('click', () => {
                        handleUserPageLink(userPageLink);
                    });
                });
    
                displayContent(container, posts, userImg, 'post'); 
                handleDeleteBtn();
            
                // TODO REMOVE?
                if (user) {
                    displayUserProfile(user, userInfoContainer);
                    const loggedInUserId = filterCookieValue('id', 'user');
                    if (user.id === loggedInUserId) {
                        displayDeleteAccountBtn();
                    }
                }

                const deleteAccountBtn = document.querySelector('.delAccountBtn') as HTMLButtonElement;
            
                postLink.addEventListener('click', handlePostLink);
                commentsLink.addEventListener('click', handleCommentsLink);

                if(deleteAccountBtn){
                    deleteAccountBtn.addEventListener('click', handleDeleteAccount);
                }
                
                async function handlePostLink():Promise<void>{
                    container.innerHTML = "";
                
                    // TODO -  NO POST
                    const posts = await api.getPostByUser(user.id as string);

                    if(posts.length){
                        displayContent(container, posts, userImg, 'post');
                        handleDeleteBtn();
                    } else{
                        container.innerHTML = `
                            <div>No posts...</div>
                        `;
                    }
                }
            
                async function handleCommentsLink():Promise<void>{
                    container.innerHTML = "";

                    const comments = await api.getCommentsByUser(user.id as string);

                    if(comments.length){
                        displayContent(container, comments, userImg, 'comment')
                        handleDeleteBtn(); 
                    } else {
                        container.innerHTML = `
                            <div>No comments...</div>
                        `;
                    }
                }
            
                async function handleDeleteAccount(): Promise<void> {
                    const confirmation = confirm('Are you sure that you want to delete your account? This cannot be undone.');
                    if (confirmation) {
                        try {
                            const response = await api.deleteAccount(user.id as string);

                            if('statusCode' in response){
                                throw new Error(response.message);
                            } else{
                                // success
                                logOut();
                            }

                        } catch(err){
                            alert(err);
                        }
                    }
                }

                function handleUserPageLink(clickedLink: HTMLElement):void {
                    userPageLinks.forEach(link => {
                        link.classList.remove('addGreyBGColor');
                    });

                    clickedLink.classList.add('addGreyBGColor');
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
    const userInfoContainer = document.querySelector('.userInfo') as HTMLDivElement;
    const deleteAccountBtn = document.createElement('button');
    deleteAccountBtn.innerText = 'Delete account'
    deleteAccountBtn.classList.add('delAccountBtn')

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
            const container = (event.target as HTMLElement).closest('.commentItem') as HTMLElement;
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

function displayContent(container: HTMLElement, items: (Post | Comment)[], userImg: Record<string, string>, typeOfContent:string) {
    container.innerHTML = "";

    items.forEach(item => {
        console.log(item)
        const itemElement = document.createElement('div');
        itemElement.classList.add('commentItem');
        itemElement.id = item.id;
        const commentWrapper = document.createElement('div');
        commentWrapper.classList.add('commentWrapper')

        const timeStampEl = document.createElement('small');
        timeStampEl.classList.add('timeStampEl');
        timeStampEl.innerText = dayjs(item.created).fromNow()
       

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('imgDiv');

        const itemBody = document.createElement('div');
        itemBody.classList.add('commentBody');

        const usernameEl = document.createElement('h2');
        usernameEl.innerText = item.user.username;

        if ('title' in item) {
            const titleEl = document.createElement('h2');
            titleEl.classList.add('postTitle');
            titleEl.innerText =item.title;
            itemBody.appendChild(titleEl);
        }
        
        const contentEl = document.createElement('div');
        contentEl.innerHTML = htmlEntitiesToString(item.body);

        
            displayUserImage(imgDiv, item.user.userImage);

         const loggedInUserId = filterCookieValue('id', 'user');
         if (item.user.id === loggedInUserId) {
            const deleteBtn = DeleteContentBtn.create(typeOfContent);
            commentWrapper.append(imgDiv, deleteBtn);
            
        } 
         else{
           
            commentWrapper.append(imgDiv, usernameEl);
         }
        
        
        itemBody.appendChild(contentEl);
        imgDiv.append(timeStampEl, usernameEl);
        itemElement.append(commentWrapper, itemBody);
        

        container.append(itemElement);
    });

}


export{displayProfile, displayUserProfile}
