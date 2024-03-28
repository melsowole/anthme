import { main } from "./components/templates/viewPostpage.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js";
import MainNav from "./components/MainNav.js";
import { getAllUsers, getPost, getComments, submitPost } from "../api.js";
import { displayUserProfile } from "./displayProfilePage.js";
import dayjs from "dayjs";
import { filterCookieValue } from "../utilities/cookieUtils.js";
import * as userImg from "../utilities/userImgUtils.js"
import { generateDropdowns } from "../utilities/dropdownUtils.js";


function displayViewPostPage(): void {
  const viewPostpage: HTMLElement = stringToDOM(main);
  const header = Header.create();
  const mainNav = MainNav.create();

async function displayViewPostPage(): Promise<void>{
    const mainNavDropdowns = await generateDropdowns();

    const viewPostpage: HTMLElement = stringToDOM(main);
    const header = Header.create();
    const mainNav = MainNav.create(mainNavDropdowns);

    document.body.append(
        viewPostpage,
        header,
        mainNav
    )
    
    // Get URL:s post id
    const urlParts:string[] = window.location.pathname.split('/');
    const urlPathEndpoint:string = urlParts[urlParts.length - 1];
        console.log(filterCookieValue('id', 'user'))
   
    getPost(urlPathEndpoint)
    .then(post => {  
       
        const titleDiv = document.querySelector('.titleDiv') as HTMLDivElement;
        const userInfoItem = document.querySelector('.userInfoItem') as HTMLDivElement;
        const commentDiv = document.querySelector('.commentInfo') as HTMLDivElement;

        const postCommentsIds = post.comments;
        const categoryEl = document.createElement('p')
        categoryEl.innerText = `u/${post.category}`;
        const titleEl = document.createElement('h2');
        titleEl.innerText = post.title;

      console.log(post);

      titleDiv.append(titleEl);
      // TODO: THREAD STARTER HEAD
      userInfoItem.append(
        UserProfile.createCommentProfile(
          post.user.username,
          post.user.userImage,
          post.created
        )
      );

                    const imgDiv = document.createElement('div');
                    imgDiv.classList.add('imgDiv');
                    const commentBody = document.createElement('div');
                    commentBody.classList.add('commentBody')
                    const usernameEl = document.createElement('h2')
                    usernameEl.innerText= comment.user.username;
                    const contentEl = document.createElement('p');
                    contentEl.innerText = comment.body;

          for (const comment of specificComments) {
            const ammountOfComments = document.querySelector(
              ".amountOfComments"
            ) as HTMLSpanElement;
            ammountOfComments.innerText = specificComments.length.toString();

            const commentItem = document.createElement("div");
            commentItem.classList.add("commentItem");

            const imgDiv = UserProfile.createCommentProfile(
              comment.user.username,
              comment.user.userImage,
              comment.created
            );

            const commentBody = document.createElement("div");
            commentBody.classList.add("commentBody");
            const usernameEl = document.createElement(
              "h2"
            ) as HTMLHeadingElement;
            const contentEl = document.createElement("p");
            contentEl.innerText = comment.body;

                }
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });

            commentForm.addEventListener('submit', (event)=>{
                event.preventDefault()
                const commentInput = document.querySelector('.commentInput') as HTMLTextAreaElement;
                const commentValue = commentInput.value;
              
                const newComment ={
                    body: commentValue
                }

                if (event.submitter && event.submitter.id === 'addCommentBtn') {
                    const loggedInUserId = filterCookieValue('id', 'user')
                    submitPost(newComment, 'comment', loggedInUserId, post.id );
                  
                }
            
                commentForm.reset();
            });

        getAllUsers()
        .then(users => {
            const userInfoContainer = viewPostpage.querySelector('.userInfoItem') as HTMLDivElement;
            
            const userId = post.user.id; 
            

            const user = users.find(user => user.id === userId);
            if (user) {
                
                displayUserProfile(user, userInfoContainer);
                
                const imgEl = viewPostpage.querySelector('img') as HTMLImageElement;
                const h2El = viewPostpage.querySelector('h2') as HTMLHeadingElement;
                imgEl.classList.add('userImg');
                h2El.id ='usernameTitle';
            
                
            } else {
                console.log(`Ingen användare hittades med ID: ${userId}`);
            }
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
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

export { displayViewPostPage, displayUserImage };
