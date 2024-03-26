import { main } from "./components/templates/viewPostpage.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js"
import MainNav from "./components/MainNav.js";
import {getAllUsers} from "../api.js"
import {displayUserProfile} from "./displayProfilePage.js"
import {getPost} from "../api.js"
import { getComments } from "../api.js";
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
    getPost('37887b4d-bc3b-43fe-83ca-aeceb63bee13')
    .then(post => {
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

                console.log(specificComments);
                for(const comment of specificComments){
                    
                    console.log(comment);
                    const commentItem= document.createElement('div');
                    commentItem.classList.add('commentItem')
                    const timeStampEl = document.createElement('small');
                    timeStampEl.classList.add('timeStampEl')
                    timeStampEl.innerText= "16h ago"
                    const imgDiv = document.createElement('div') as HTMLDivElement
                    imgDiv.classList.add('imgDiv');
                    const commentBody = document.createElement('div');
                    commentBody.classList.add('commentBody')
                    const usernameEl = document.createElement('h2') as HTMLHeadingElement;
                    usernameEl.innerText= comment.username;
                    const contentEl = document.createElement('p');
                    contentEl.innerText = comment.body;
                    
                    
                    if(comment.userImage === 'pizza'){
                        displayUserImage(imgDiv, userImg.pizza)
                    }
                    else if(comment.userImage === 'donut'){
                        displayUserImage(imgDiv, userImg.donut)
                    }
                    else displayUserImage(imgDiv, userImg.banana)
                  
                    commentBody.append(usernameEl, contentEl)
                    imgDiv.append(timeStampEl, usernameEl)
                    commentItem.append(imgDiv, commentBody)
                    commentDiv.append(commentItem)

                }
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    })
    .catch(error => {
        console.error('Error fetching post:', error);
    });

    getAllUsers()
    .then(users => {
    const userInfoContainer = viewPostpage.querySelector('.userInfoItem') as HTMLDivElement;
    
    const userId = "ae98fe9d-fdfa-4755-9f03-30e1a8e49eef"; 

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
}

function displayUserImage(container: HTMLDivElement, imgPath:string): void {
    const imgEl = document.createElement('img');
    imgEl.src = imgPath; 
    imgEl.classList.add('userImg');

   container.appendChild(imgEl);
}

export {displayViewPostPage}