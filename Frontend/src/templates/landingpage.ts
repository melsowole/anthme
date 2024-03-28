const div = `
<div class="landingPageContainer">
    <div class="landingPageTitle">
            <h1>To view Anthme you must be signed in</h1>

            <div class="landingPageContent">
                <h2>Join today.</h2>
                <button id="createAccountBtn">Create account</button>
                <h3>Already have an account?</h3>
                <button id="signInBtn">Sign in</button>
            </div>

        
    </div>
    
    <div class="formContainer">
        <form class="createAccountform hide popup">
            <i class="fas fa-times fa-lg xmarkClose "></i>
            <h2>Create account</h2>
            <input type="text" id="userNameInput" name="username"  placeholder="Username *" required>
            <input type="password" id="passwordInput" name="password"  placeholder="Password *" required>

            <div class="selectUserImg">
                <div class="imgContainer"></div>

                <select name="userImage" id="userImage">
                    <option disabled selected>Choose user image:</option>
                    <option value="userImgBanana">Banana</option>
                    <option value="userImgDounat">Donut</option>
                    <option value="userImgPizza">Pizza</option>
                </select>
            </div>
            <span class="accountDetails">Already an Antheme? <a class="link" href="#">Log in</a></span>
            <button id="createAccountFormBtn">Create account</button>
        </form>

        <form class="logInForm hide popup">
            <i class="fas fa-times fa-lg xmarkClose xmarkCloseLogin"></i>
            <h2>Log in</h2>
            <input type="text" id="logInUsername" name="username"  placeholder="Username *" required>
            <input type="password" id="logInPassword" name="password"  placeholder="Password *" required>
            <span class="accountDetails">New to Antheme? <a class="link" href="#">Sign up</a></span>
            <button id="logInBtn">Log in</button>
        </form>
    </div>
 </div>   
`
export {div}