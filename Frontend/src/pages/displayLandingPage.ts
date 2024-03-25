import { addUser, User, getAllUsers} from '../modules/fetchUsers.js';
import {displayProfile} from "./displayProfile.js";
import {landingPageString} from "../templates/landingpage.js"
// import{main} from "../templates/profilepage.js"
import { stringToDOM } from "../modules/template-utils.js";
import { sendLogInRequest } from '../modules/api.js';


 function displayLandingPage():void {
    let landingpageTemplate = landingPageString;
    const landingPage : HTMLElement = stringToDOM(landingpageTemplate);
    document.body.append(landingPage);

    const createAccountBtn = landingPage.querySelector('#createAccountBtn') as HTMLButtonElement;
    const signInBtn = landingPage.querySelector('#signInBtn') as HTMLButtonElement;
    const createAccountForm = landingPage.querySelector('.createAccountform') as HTMLFormElement;
    const logInForm = landingPage.querySelector('.logInForm ') as HTMLFormElement;
    const selectElement = landingPage.querySelector('#userImage') as HTMLSelectElement;
    const closeFormBtns = landingPage.querySelectorAll('.xmarkClose');
    const userPageLink = landingPage.querySelector('.userPageLink') as HTMLAnchorElement;


    createAccountBtn.addEventListener('click', ()=>{
        createAccountForm.classList.remove('hide');
        logInForm.classList.add('hide');
    })

    signInBtn.addEventListener('click', ()=>{
        logInForm.classList.remove('hide');
        createAccountForm.classList.add('hide')
    })

    selectElement.addEventListener("change", function() {
        const imageContainer = document.querySelector('.imgContainer') as HTMLDivElement;
    
        let selectedValue = selectElement.value;
    
        if(selectedValue === 'userImgBanana'){
            displayUserImage(imageContainer,'userImgBanana.971fd618.png')
        }
        else if(selectedValue === 'userImgDounat'){
            displayUserImage(imageContainer, 'userImgDounat.bd9437ed.png')
        }
        else{

            displayUserImage(imageContainer, 'userImgPizza.54bcfdca.png')
        }
        
    });

    closeFormBtns.forEach(closeFormBtn => {
        closeFormBtn.addEventListener('click', () => {
            
            const formToHide = closeFormBtn.closest('form');
            if (formToHide) {
                formToHide.classList.add('hide');
            }
        });
    });

    createAccountForm.addEventListener('submit', async (event)=>{
        event.preventDefault();
        const userNameInput = document.querySelector('#userNameInput') as HTMLInputElement;
        const username = userNameInput.value;

        const passwordInput = document.querySelector('#passwordInput') as HTMLInputElement;
        const password = passwordInput.value;
        const selectedValue = selectElement.value;
        
        const newUser: User = {
            username: username,
            password: password,
            userImage: selectedValue
        };

        try {
            const addedUser = await addUser(newUser);
            console.log("User added successfully:", addedUser);
            
        } catch (error) {
            console.error("Error adding user:", error);
            
        }

        createAccountForm.reset();
    });

    logInForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        const logInUsername = document.querySelector('#logInUsername') as HTMLInputElement;
        const username = logInUsername.value
        
        const logInPassword = document.querySelector('#logInPassword') as HTMLInputElement;
        const password = logInPassword.value;

        sendLogInRequest(username, password)
        
        logInForm.reset();
    })

    const signUpLinks = document.querySelectorAll('.link');

    signUpLinks.forEach(signUpLink => {
        signUpLink.addEventListener('click', (event) => {
            event.preventDefault(); 

            if (createAccountForm && logInForm) {
                if (signUpLink.textContent === 'Sign up') {
                    createAccountForm.classList.remove('hide');
                    logInForm.classList.add('hide');
                } 
                else if (signUpLink.textContent === 'Log in') {
                    logInForm.classList.remove('hide');
                    createAccountForm.classList.add('hide');
                }
            }
        });
    });


    // userPageLink.addEventListener('click', ()=>{
    //     const link = document.querySelector('.link') as HTMLAnchorElement
    //     link.classList.add('addGreyBGColor');
    // })
}


 function displayUserImage(container: HTMLDivElement, imgPath:string): void {

    container.innerHTML = '';

    const imgEl: HTMLImageElement = document.createElement('img');
    imgEl.src = imgPath; 

   container.appendChild(imgEl);
}

export {displayLandingPage}