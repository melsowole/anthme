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
        <a class="to-profile unstyle" href="/profile/__username__">View Profile</a>
        <small class="username">u/__username__</small>
    </div>
    <hr>
    <ul>
        <li>Dark mode toggle</li>
        <li>Log Out</li>
    </ul>
    <hr>
    <a>Delete Account</a>
</div>
`;

export { header, profileMenu };
