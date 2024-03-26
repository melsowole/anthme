import { main } from "../templates/viewPostpage";
import { stringToDOM } from "../modules/template-utils.js";
import Header from "../components/Header.js"
import MainNav from "../components/MainNav.js";
import {getAllUsers} from "../modules/api.js"
import {displayUserProfile} from "./displayProfile.js"
import {getPost} from "../modules/api.js"
import { getComments } from "../modules/api.js";
const bananaUrlObj = new URL("../img/userImgBanana.png", import.meta.url);
const pizzaUrlObj = new URL("../img/userImgPizza.png", import.meta.url);
const dounatUrlObj = new URL("../img/userImgDounat.png", import.meta.url);


function displayViewPostPage():void{
    const viewPostpage: HTMLElement = stringToDOM(main);
    const header = Header.create();
    const mainNav = MainNav.create();

    document.body.append(
        viewPostpage,
        header,
        mainNav
    )
    getPost('274965e7-2da6-4747-a31a-176b2ff24fd3')
    .then(post => {
        const postCommentsIds = post.comments;
        const titleDiv = document.querySelector('.titleDiv');
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
                        displayUserImage(imgDiv, pizzaUrlObj.href)
                    }
                    else if(comment.userImage === 'dounat'){
                        displayUserImage(imgDiv, dounatUrlObj.href)
                    }
                    else displayUserImage(imgDiv, bananaUrlObj.href)
                  
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
    
    const userId = "8d18b516-ac9b-4a33-bbba-e0cf843589df"; 

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