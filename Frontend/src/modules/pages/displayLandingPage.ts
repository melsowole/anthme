import { addUser, User, getAllUsers} from '../fetchUsers.js';
import {landingPageString} from "./components/templates/landing-page.js"
import { replace, stringToDOM } from "../utilities/templateUtils.js";
import * as api  from '../api.js';
import * as userImg from "../utilities/userImgUtils.js"

// Variabler för formulär och andra element
let createAccountForm: HTMLFormElement;
let logInForm: HTMLFormElement;
let selectElement: HTMLSelectElement;

function displayLandingPage(): void {
    let landingpageTemplate = landingPageString;
    landingpageTemplate = replace(landingpageTemplate, [
        {pattern: 'banana', replacement: userImg.banana},
        {pattern: 'donut', replacement: userImg.donut},
        {pattern: 'pizza', replacement: userImg.pizza}
    ])
    
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
        displayUserImage(imageContainer, userImg.banana)
    } else if (selectedValue === 'donut') {
        displayUserImage(imageContainer, userImg.donut)
    } else {
        displayUserImage(imageContainer, userImg.pizza)
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
        const response = await api.submitPost(newUser, 'user')   
        
        if(response.statusCode ===  409) throw new Error(response.message);
        
        await api.sendLogInRequest(username, password);
        window.location.replace("/");
        
    } catch (error) {
        alert(error);
    }

    createAccountForm.reset();
}

async function handleLogInForm(event: Event): Promise<void> {
    event.preventDefault();
    const logInUsername = document.querySelector('#logInUsername') as HTMLInputElement;
    const username = logInUsername.value

    const logInPassword = document.querySelector('#logInPassword') as HTMLInputElement;
    const password = logInPassword.value;

    try {
        const response = await api.sendLogInRequest(username, password);

        if(response.statusCode === 401) throw new Error(response.message);
        
        window.location.replace("/");
    }
    catch(error) {
        alert(error)
    }

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
