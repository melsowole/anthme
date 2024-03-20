import { displayUserImage } from "./modules/display.js";
import { addUser, User, getAllUsers} from './modules/fetchUsers.js';
import { validateLogIn } from "./modules/function.js";

const createAccountBtn = document.querySelector('#createAccountBtn') as HTMLButtonElement;
const signInBtn = document.querySelector('#signInBtn') as HTMLButtonElement;
const createAccountForm = document.querySelector('.createAccountform') as HTMLFormElement;
const logInForm = document.querySelector('.logInForm ') as HTMLFormElement;
const imageContainer = document.querySelector('.imgContainer') as HTMLDivElement;
const selectElement = document.querySelector('#userImage') as HTMLSelectElement;
const closeFormBtns = document.querySelectorAll('.xmarkClose');

createAccountBtn.addEventListener('click', ()=>{
    createAccountForm.classList.remove('hide');
    logInForm.classList.add('hide');
})

signInBtn.addEventListener('click', ()=>{
    logInForm.classList.remove('hide');
    createAccountForm.classList.add('hide')
})

selectElement.addEventListener("change", function() {
  
    let selectedValue = selectElement.value;
    console.log("Selected value:", selectedValue);

    if(selectedValue === 'userImgBanana'){
        displayUserImage('userImgBanana.971fd618.png')
    }
    else if(selectedValue === 'userImgDounat'){
        displayUserImage('userImgDounat.bd9437ed.png')
    }
    else{
        displayUserImage('userImgPizza.54bcfdca.png')
    }

    const selectedIndex = selectElement.selectedIndex;
    const selectedText = selectElement.options[selectedIndex].text;
    console.log("Selected text:", selectedText);
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
    
    const newUser: User = {
        username: username,
        password: password,
        userImage: 'img/img'
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

    getAllUsers()
    .then(users => {
    const isValidLogin = validateLogIn(users, username, password);
    if (isValidLogin) {
        console.log('Valid login');
    } else {
        console.log('Invalid login');
    }
})
.catch(error => {
    console.error('Error fetching users:', error);
});

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
            } else if (signUpLink.textContent === 'Log in') {
                logInForm.classList.remove('hide');
                createAccountForm.classList.add('hide');
            }
        }
    });
});

