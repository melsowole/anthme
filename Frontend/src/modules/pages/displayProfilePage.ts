import { main } from "./components/templates/profile-page.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js"
import MainNav from "./components/MainNav.js";
import * as userImg from "../utilities/userImgUtils.js"
import * as api from "../api.js"
import { deleteCookie, filterCookieValue  } from "../utilities/cookieUtils.js";
import { User } from "../utilities/pathTypes.js";
import dayjs from "dayjs";
import {getPostByUser, getCommentsByUser} from "../api.js"
import {displayUserImage} from "./displayPostPage"
import {Post, Comment} from "../utilities/pathTypes.js"
import { generateDropdowns } from "../utilities/dropdownUtils.js";
import {DeleteContentBtn} from"./components/DeleteContentBtn.js"

async function displayProfile():Promise<void> {
    const mainNavDropdowns = await generateDropdowns();
    const profilepage: HTMLElement = stringToDOM(main);
    const header = Header.create();
    const mainNav = MainNav.create(mainNavDropdowns);
  
    document.body.append(
        profilepage,
        mainNav,
        header
    )

    const userInfoContainer = profilepage.querySelector('.userInfo') as HTMLDivElement;
    const userPageLinks = profilepage.querySelectorAll('.userPageLink') as NodeListOf<HTMLAnchorElement>;
    const postLink = document.querySelector('.postLink') as HTMLAnchorElement;
    const commentsLink = document.querySelector('.commentsLink') as HTMLAnchorElement;
    const container = document.querySelector('.commentContainer') as HTMLDivElement;

    const urlParts: string[] = window.location.pathname.split('/');
    const urlPathEndpoint: string = urlParts[urlParts.length - 1];
   
    await api.getUserByUsername(urlPathEndpoint)
        .then(async (user) => {
           
            console.log(user)
            postLink.classList.add('addGreyBGColor')

           await getPostByUser(user.id)
                .then(posts =>{
                    //FLYTTA EJ PÅ DENNA
                    userPageLinks.forEach(userPageLink => {
                        userPageLink.addEventListener('click', () => {
                            handleUserPageLink(userPageLink);
                        });
                    });
        
                    displayContent(container, posts, userImg, 'post'); 
                    handleDeleteBtn();
                    
                }) 
            
            if (user) {
                displayUserProfile(user, userInfoContainer);
                const loggedInUserId = filterCookieValue('id', 'user');
                if (user.id === loggedInUserId) {
                    displayDeleteAccountBtn();
                   
                   
                }
               else return
            }

            
            else {
                console.log(`Ingen anvÃ¤ndare hittades`);
            }

            const deleteAccountBtn = document.querySelector('.delAccountBtn') as HTMLButtonElement;
            

            postLink.addEventListener('click', handlePostLink);
            commentsLink.addEventListener('click', handleCommentsLink);
            deleteAccountBtn.addEventListener('click', handleDeleteAccount);
           
            function handlePostLink():void{
                container.innerHTML = "";
            
                getPostByUser(user.id)
                    .then(posts => {
                        console.log(posts)
                        container.innerHTML = "";
                        displayContent(container, posts, userImg, 'post');
                        handleDeleteBtn();  
                    });     
            }
           
            function handleCommentsLink():void{
                container.innerHTML = "";
               
                getCommentsByUser(user.id)
                .then(comments=>{
                    container.innerHTML = "";
                    displayContent(container, comments, userImg, 'comment')
                    handleDeleteBtn();
                    //displayDeleteBtn('comment');
                })
            }
            
            function handleDeleteAccount(): void {
            const confirmation = confirm('Are you sure that you want to delete your account? This cannot be undone.');

                if (confirmation) {
                    api.deleteAccount(user.id)
                    .then(() => {
                    logOut();    
                });
            }
        }

        function handleUserPageLink(clickedLink: HTMLElement):void {
            userPageLinks.forEach(link => {
                link.classList.remove('addGreyBGColor');
            });
            
            clickedLink.classList.add('addGreyBGColor');
        }

        
    })
    .catch(error => {
        console.error('Error fetching users:', error);
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

    const userImageUrl = userImg[user.userImage] || userImg.donut;
    const userImage = new Image();
    userImage.src = userImageUrl;

    userInfo.append(userImage, userNameEl)
    container.append(userInfo);
}



 function handleDeleteBtn():void {
    const deleteBtns = document.querySelectorAll('.delete-btn') as NodeListOf<HTMLButtonElement>;
    console.log(deleteBtns)
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', async (event) => {

            event.stopPropagation();
            const container = (event.target as HTMLElement).closest('.commentItem')
            const containerId = container.id
            const loggedInUserId = filterCookieValue('id', 'user')
           
            if(deleteBtn.classList.contains('post')){
                console.log('post')
                api.deletePost(loggedInUserId, containerId)
                container.remove();
            }

            else{
                console.log('comment')
                console.log(containerId)

                api.getComment(containerId)
                const commentObj = await api.getComment(containerId)
                console.log(commentObj.postId)

                api.deleteComment(commentObj.postId, loggedInUserId, commentObj.id)
                container.remove();

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
        timeStampEl.innerText = dayjs(item.created).format('DD MMMM YYYY');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('imgDiv');

        const itemBody = document.createElement('div');
        itemBody.classList.add('commentBody');

        const usernameEl = document.createElement('h2');
        usernameEl.innerText = item.user.username;

        const contentEl = document.createElement('p');
        contentEl.innerHTML = item.body;

        if (item.user.userImage === 'pizza') {
            displayUserImage(imgDiv, userImg.pizza);
        } else if (item.user.userImage === 'donut') {
            displayUserImage(imgDiv, userImg.donut);
        } else {
            displayUserImage(imgDiv, userImg.banana);
        }

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
