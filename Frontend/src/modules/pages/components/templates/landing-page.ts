const landingPageString = `
<div class="landing-page-container">
    
    <div class="landing-page-title">
            <h1>To view Anthme you must be signed in</h1>

            <div class="landing-page-content">
                <h2>Join today.</h2>
                <button id="createAccountBtn">Create account</button>
                <h3>Already have an account?</h3>
                <button id="signInBtn">Sign in</button>
            </div>

        
    </div>
    
    <div class="form-container popup-form-container">
        <form class="create-account-form hide popup popup-form">
            <i class="fas fa-times fa-lg xmark-close "></i>
            <h2>Create account</h2>
            <input type="text" id="userNameInput" name="username"  placeholder="Username *" required>
            <input type="password" id="passwordInput" name="password"  placeholder="Password *" required>

            <div class="select-user-img">
                <div class="img-container"></div>

                <select name="userImage" id="userImage">
                    <option disabled selected>Choose user image:</option>
                    <option value="__banana__">Banana</option>
                    <option value="__donut__">Donut</option>
                    <option value="__pizza__">Pizza</option>
                </select>
            </div>
            <span class="account-details">Already an Antheme? <a class="link" href="#">Log in</a></span>
            <button id="createAccountFormBtn">Create account</button>
        </form>

        <form class="log-in-form hide popup popup-form">
            <i class="fas fa-times fa-lg xmark-close xmark-close-login"></i>
            <h2>Log in</h2>
            <input type="text" id="logInUsername" name="username"  placeholder="Username *" required>
            <input type="password" id="logInPassword" name="password"  placeholder="Password *" required>
            <span class="account-details">New to Antheme? <a class="link" href="#">Sign up</a></span>
            <button id="logInBtn">Log in</button>
        </form>
    </div>
 </div>   
`
export {landingPageString}