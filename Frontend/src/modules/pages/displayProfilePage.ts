import { main } from "./components/templates/profile-page.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js"
import MainNav from "./components/MainNav.js";
import * as userImg from "../utilities/userImgUtils.js"
import * as api from "../api.js"
import { User } from "../utilities/pathTypes.js";
import dayjs from "dayjs";
import {getPostByUser, getCommentsByUser} from "../api.js"
import {displayUserImage} from "./displayPostPage"
import { generateDropdowns } from "../utilities/dropdownUtils.ts";

async function displayProfile(): Promise<void> {
    const mainNavDropdowns = await generateDropdowns();

    const profilepage: HTMLElement = stringToDOM(main);
    const header = Header.create();
    const mainNav = MainNav.create(mainNavDropdowns);
  
    document.body.append(
        profilepage,
        mainNav,
        header
    )

    const userInfoContainer = profilepage.querySelector('.userInfoItem') as HTMLDivElement;
    const userPageLinks = profilepage.querySelectorAll('.userPageLink') as NodeListOf<HTMLAnchorElement>;

    const urlParts: string[] = window.location.pathname.split('/');
    const urlPathEndpoint: string = urlParts[urlParts.length - 1];

    const postLink = document.querySelector('.postLink') as HTMLAnchorElement;
    const commentsLink = document.querySelector('.commentsLink') as HTMLAnchorElement;
    const commentDiv = document.querySelector('.commentContainer') as HTMLDivElement;

    api.getUserByUsername(urlPathEndpoint)
        .then(user => {
            console.log(user)
            if (user) {
                displayUserProfile(user, userInfoContainer);
            }
            else {
                console.log(`Ingen användare hittades`);
            }

            postLink.addEventListener('click', ()=>{
                console.log('postLink')
                getPostByUser(user.id)
                .then(posts =>{
                    console.log(posts)
                })
                commentDiv.innerHTML = "";
                
            })
            commentsLink.addEventListener('click', ()=>{
                console.log('commentsLink')
                getCommentsByUser(user.id)
                .then(comments=>{
                    console.log(comments)
                    
                    commentDiv.innerHTML = "";
        
                    comments.forEach(comment => {
                        
                        const commentItem = document.createElement('div');
                        commentItem.classList.add('commentItem');
                        const timeStampEl = document.createElement('small');
                        timeStampEl.classList.add('timeStampEl');
                        timeStampEl.innerText = dayjs(comment.created).format('DD MMMM YYYY');
                        const imgDiv = document.createElement('div')
                        imgDiv.classList.add('imgDiv');
                        const commentBody = document.createElement('div');
                        commentBody.classList.add('commentBody')
                        const usernameEl = document.createElement('h2');
                        usernameEl.innerText= comment.user.username;
                        const contentEl = document.createElement('p');
                        contentEl.innerText = comment.body;
        
                        if (comment.user.userImage === 'pizza') {
                            displayUserImage(imgDiv, userImg.pizza);
                        } else if (comment.user.userImage === 'donut') {
                            displayUserImage(imgDiv, userImg.donut);
                        } else {
                            displayUserImage(imgDiv, userImg.banana);
                        }
        
                        commentBody.append(usernameEl, contentEl);
                        imgDiv.append(timeStampEl, usernameEl);
        
                        
                        commentItem.append(imgDiv, commentBody);
                        commentDiv.append(commentItem); 
                        
                    });
                    
                })
            })
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });

    userPageLinks.forEach(userPageLink => {
        userPageLink.addEventListener('click', () => {
            userPageLinks.forEach(link => {
                link.classList.remove('addGreyBGColor');
            });
    
            userPageLink.classList.add('addGreyBGColor');
        });
    });
   
}

function displayUserProfile(user: User, container: HTMLDivElement): void {
    const userNameEl = document.createElement('h2');
    userNameEl.innerText = user.username;
    container.append(userNameEl);

    const userImageUrl = userImg[user.userImage] || userImg.donut;
    console.log(userImageUrl)
    const userImage = new Image();
    userImage.src = userImageUrl;
    container.appendChild(userImage);
}


export{displayProfile, displayUserProfile}

