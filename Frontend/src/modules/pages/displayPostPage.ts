import { main } from "./components/templates/viewPostpage.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js"
import MainNav from "./components/MainNav.js";
import {getAllUsers, getPost, getComments, submitPost} from "../api.js"
import {displayUserProfile} from "./displayProfilePage.js"
import dayjs from "dayjs";
import * as userImg from "../utilities/userImgUtils.js"


function displayViewPostPage():void{
    const viewPostpage: HTMLElement = stringToDOM(main);
    const header = Header.create();
    const mainNav = MainNav.create();

    document.body.append(
        viewPostpage,
        header,
        mainNav
    )
    
    // Get URL:s post id
    const urlParts:string[] = window.location.pathname.split('/');
    const urlPathEndpoint:string = urlParts[urlParts.length - 1];
   
    getPost(urlPathEndpoint)
    .then(post => {  
        console.log(post.user.id)
        const postCommentsIds = post.comments;
        const titleDiv = document.querySelector('.titleDiv') as HTMLDivElement;
        const userInfoItem = document.querySelector('.userInfoItem') as HTMLDivElement;
        const commentDiv = document.querySelector('.commentInfo') as HTMLDivElement;
        const categoryEl = document.createElement('p')
        categoryEl.innerText = `u/${post.category}`;
        const titleEl = document.createElement('h2');
        titleEl.innerText = post.title;

        titleDiv.append(titleEl)
        userInfoItem.append(categoryEl)

        // Hämta alla kommentarer
        getComments()
            .then(comments => {
                // Filtrera kommentarerna för att endast inkludera de som har ID:n som finns i inläggets kommentarslista
                const specificComments = comments.filter(comment => postCommentsIds.includes(comment.id));
                
                for(const comment of specificComments){
                    const ammountOfComments = document.querySelector('.amountOfComments') as HTMLSpanElement;
                    ammountOfComments.innerText = specificComments.length.toString();
                    
                    const commentItem= document.createElement('div');
                    commentItem.classList.add('commentItem')
                    const timeStampEl = document.createElement('small');
                    timeStampEl.classList.add('timeStampEl')
                    timeStampEl.innerText = dayjs(comment.user.created).format('DD MMMM YYYY');

                    const imgDiv = document.createElement('div') as HTMLDivElement
                    imgDiv.classList.add('imgDiv');
                    const commentBody = document.createElement('div');
                    commentBody.classList.add('commentBody')
                    const usernameEl = document.createElement('h2') as HTMLHeadingElement;
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


                }
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });

            commentForm.addEventListener('submit', (event)=>{
                event.preventDefault()
                const commentInput = document.querySelector('.commentInput') as HTMLTextAreaElement;
                const commentValue = commentInput.value;
                console.log(commentValue)
                const newComment ={
                    body: commentValue
                }
                if (event.submitter && event.submitter.id === 'addCommentBtn') {
                    submitPost(newComment, 'comment', post.user.id, post.id );
                }
            
                commentForm.reset();
            });

            getAllUsers()
        .then(users => {
            const userInfoContainer = viewPostpage.querySelector('.userInfoItem') as HTMLDivElement;
            
            const userId = post.user.id; 
            console.log(userId)

            const user = users.find(user => user.id === userId);
            if (user) {
                console.log(user.posts);
                displayUserProfile(user, userInfoContainer);
                
                const imgEl = viewPostpage.querySelector('img') as HTMLImageElement;
                const h2El = viewPostpage.querySelector('h2') as HTMLHeadingElement;
                imgEl.classList.add('userImg');
                h2El.id ='usernameTitle';
            
                
            } else {
                console.log(`Ingen användare hittades med ID: ${userId}`);
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching post:', error);
    });

    const addCommentBtn = document.querySelector('.addCommentBtn') as HTMLButtonElement;
    const textareaContainer = document.querySelector('.textareaContainer') as HTMLTextAreaElement;
    addCommentBtn.addEventListener('click', ()=>{
        
        textareaContainer.classList.remove('hide');
    });

    const commentForm = document.querySelector('.commentForm') as HTMLFormElement;
    const cancelBtn = document.querySelector('.cancelButton') as HTMLButtonElement;
    cancelBtn.addEventListener('click', (event)=>{
        event.preventDefault(); 
        textareaContainer.classList.add('hide');
        commentForm.reset();
      
    });

    
    
}

function displayUserImage(container: HTMLDivElement, imgPath:string): void {
    const imgEl = document.createElement('img');
    imgEl.src = imgPath; 
    imgEl.classList.add('userImg');

   container.appendChild(imgEl);
}

export {displayViewPostPage, displayUserImage}