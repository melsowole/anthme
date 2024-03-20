const createAccountBtn = document.querySelector('#createAccountBtn') as HTMLButtonElement;
const signInBtn = document.querySelector('#signInBtn') as HTMLButtonElement;
const createAccountForm = document.querySelector('.createAccountform') as HTMLFormElement;
const logInForm = document.querySelector('.logInForm ') as HTMLFormElement;

createAccountBtn.addEventListener('click', ()=>{
   logInForm.classList.remove('show');
    createAccountForm.classList.add('show');

})

signInBtn.addEventListener('click', ()=>{
    createAccountForm.classList.remove('show');
    logInForm.classList.add('show');
})