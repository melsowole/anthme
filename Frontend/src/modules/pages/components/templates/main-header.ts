const header = `
<header class="main-header">
    <a class="logo" href="/">ANTHME</a>
    <nav class="user-nav">
        <a class="unstyle pill hint--left hint--rounded" href="/create-post" aria-label="Create Post" aria-hidden="true">
            <span class="icon material-symbols-outlined">add</span>
            Create
        </a>
        
    </nav>
</header>
`;

const profileMenu = `
<div class="profile-menu">
    <!--user preview here -->
    <hr>
    <ul>
        <li><button id="log-out" class="unstyle">Log Out</button></li>
        <hr>
        <li><button id="delete-account" class="unstyle">Delete Account</button></li>
    </ul>
</div>
`;

export { header, profileMenu };
