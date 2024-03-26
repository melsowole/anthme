import { addUser, User, getAllUsers} from '../modules/fetchUsers.js';
import {displayProfile} from "./displayProfile.js";
import {landingPageString} from "../templates/landingpage.js"
// import{main} from "../templates/profilepage.js"
import { stringToDOM } from "../modules/template-utils.js";
import { sendLogInRequest } from '../modules/api.js';

const bananaUrlObj = new URL("../img/userImgBanana.png", import.meta.url);
const pizzaUrlObj = new URL("../img/userImgPizza.png", import.meta.url);
const dounatUrlObj = new URL("../img/userImgDounat.png", import.meta.url);


// Variabler för formulär och andra element
let createAccountForm: HTMLFormElement;
let logInForm: HTMLFormElement;
let selectElement: HTMLSelectElement;

function displayLandingPage(): void {
    let landingpageTemplate = landingPageString;
    const landingPage: HTMLElement = stringToDOM(landingpageTemplate);
    document.body.append(landingPage);
    
    const createAccountBtn = landingPage.querySelector('#createAccountBtn') as HTMLButtonElement;
    const signInBtn = landingPage.querySelector('#signInBtn') as HTMLButtonElement;
    createAccountForm = landingPage.querySelector('.createAccountform') as HTMLFormElement;
    logInForm = landingPage.querySelector('.logInForm') as HTMLFormElement;
    selectElement = landingPage.querySelector('#userImage') as HTMLSelectElement;
    const closeFormBtns = landingPage.querySelectorAll('.xmarkClose') as NodeListOf<HTMLElement>;
    const signUpLinks = landingPage.querySelectorAll('.link') as NodeListOf<HTMLAnchorElement>;

    createAccountBtn.addEventListener('click', handleCreateAccountBtn);
    signInBtn.addEventListener('click', handleSignInBtnClick);
    document.addEventListener('click', handleDocumentClick);
    selectElement.addEventListener("change", handleSelectImgElement);
    closeFormBtns.forEach(closeFormBtn => {
        closeFormBtn.addEventListener('click', handleCloseFormBtn);
    });
    createAccountForm.addEventListener('submit', handleCreateAccount);
    logInForm.addEventListener('submit', handleLogInForm);
    signUpLinks.forEach(signUpLink => {
        signUpLink.addEventListener('click', handleSignUpLink);
    });
}

function handleCreateAccountBtn(): void {
    createAccountForm.classList.remove('hide');
    logInForm.classList.add('hide');
}

function handleSignInBtnClick(): void {
    logInForm.classList.remove('hide');
    createAccountForm.classList.add('hide');
}

function handleDocumentClick(event: MouseEvent): void {
    const container = document.querySelector('.landingPageContainer') as HTMLDivElement;
    if (container && !container.contains(event.target as Node)) {
        createAccountForm.classList.add('hide');
        logInForm.classList.add('hide');
    }
}

function handleSelectImgElement(): void {
    const imageContainer = document.querySelector('.imgContainer') as HTMLDivElement;
    let selectedValue = selectElement.value;
    if (selectedValue === 'banana') {
        displayUserImage(imageContainer, bananaUrlObj.href)
    } else if (selectedValue === 'dounat') {
        displayUserImage(imageContainer, dounatUrlObj.href)
    } else {
        displayUserImage(imageContainer, pizzaUrlObj.href)
    }
}

function handleCloseFormBtn(event: MouseEvent): void {
    const formToHide = (event.currentTarget as HTMLElement).closest('form');
    if (formToHide) {
        formToHide.classList.add('hide');
    }
}

async function handleCreateAccount(event: Event): Promise<void> {
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
}

function handleLogInForm(event: Event): void {
    event.preventDefault();
    const logInUsername = document.querySelector('#logInUsername') as HTMLInputElement;
    const username = logInUsername.value

    const logInPassword = document.querySelector('#logInPassword') as HTMLInputElement;
    const password = logInPassword.value;

    sendLogInRequest(username, password)

    logInForm.reset();
}

function handleSignUpLink(event: Event): void {
    event.preventDefault();
    if (createAccountForm && logInForm) {
        if ((event.currentTarget as HTMLAnchorElement).textContent === 'Sign up') {
            createAccountForm.classList.remove('hide');
            logInForm.classList.add('hide');
        } else if ((event.currentTarget as HTMLAnchorElement).textContent === 'Log in') {
            logInForm.classList.remove('hide');
            createAccountForm.classList.add('hide');
        }
    }
}

function displayUserImage(container: HTMLDivElement, imgPath:string): void {

    container.innerHTML = '';

    const imgEl = document.createElement('img');
    imgEl.src = imgPath; 

   container.appendChild(imgEl);
}

export {displayLandingPage, displayUserImage}
