const header = `
<header class="main-header">
    <a class="logo" href="/">ANTHME</a>
    <nav class="user-nav">
        <a class="unstyle pill" href="/create-post" aria-label="Create Post" aria-hidden="true">
            <span class="icon material-symbols-outlined">add</span>
            Create
        </a>
        <div class="user">
            <div class="img-icon"></div>
        </div>
    </nav>
</header>
`;

const profileMenu = `
<div class="profile-menu">
    <div class="user">
        <div class="img-icon"></div>
        <a class="to-profile unstyle" href="/profile/__username__"><small>View Profile</small></a>
        <small class="username">u/__username__</small>
    </div>
    <hr>
    <ul>
        <li><button id="log-out" class="unstyle">Log Out</button></li>
        <hr>
        <li><button id="delete-account" class="unstyle">Delete Account</button></li>
    </ul>
</div>
`;

export { header, profileMenu };
