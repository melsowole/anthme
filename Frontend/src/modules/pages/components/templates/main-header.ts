// Templates for Header
// This file contains templates for the main page header

// exports: 
// - header (header elem with logo and navigation)
// - profileMenu (user dropdown displayed on profile icon click)
//      - userPreview should be prepended in container (by comment)

const header = `
<header class="main-header">
    <a class="logo" href="/">
        <?xml version="1.0" encoding="UTF-8"?><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 603.56 120.94"><defs><style>.cls-1{stroke-width:0px;}</style></defs><path class="cls-1" d="m60.16,119.41l-4.53-11.66h-.61c-3.94,4.96-7.99,8.4-12.16,10.32-4.17,1.92-9.61,2.88-16.31,2.88-8.24,0-14.72-2.35-19.45-7.06-4.73-4.71-7.1-11.41-7.1-20.11s3.18-15.82,9.55-20.14c6.37-4.32,15.97-6.71,28.82-7.18l14.89-.46v-3.76c0-8.7-4.45-13.05-13.35-13.05-6.86,0-14.91,2.07-24.17,6.22l-7.75-15.81c9.87-5.17,20.82-7.75,32.84-7.75s20.34,2.51,26.48,7.52c6.14,5.01,9.21,12.64,9.21,22.87v57.17h-16.35Zm-6.91-39.75l-9.06.31c-6.8.21-11.87,1.43-15.19,3.68-3.33,2.25-4.99,5.68-4.99,10.28,0,6.6,3.79,9.9,11.36,9.9,5.42,0,9.76-1.56,13.01-4.68,3.25-3.12,4.87-7.26,4.87-12.43v-7.06Z"/><path class="cls-1" d="m179.8,119.41h-23.41v-50.11c0-6.19-1.1-10.83-3.3-13.93-2.2-3.09-5.71-4.64-10.51-4.64-6.55,0-11.28,2.19-14.2,6.56s-4.37,11.63-4.37,21.76v40.36h-23.41V33.61h17.88l3.15,10.97h1.3c2.61-4.14,6.2-7.28,10.78-9.4,4.58-2.12,9.78-3.18,15.62-3.18,9.98,0,17.55,2.7,22.71,8.1,5.17,5.4,7.75,13.19,7.75,23.37v55.94Z"/><path class="cls-1" d="m240.04,102.29c4.09,0,9-.89,14.73-2.69v17.42c-5.83,2.61-13,3.91-21.49,3.91-9.36,0-16.18-2.37-20.45-7.1-4.27-4.73-6.41-11.83-6.41-21.3v-41.36h-11.2v-9.9l12.89-7.83,6.75-18.11h14.96v18.26h24.02v17.57h-24.02v41.36c0,3.33.93,5.78,2.8,7.37,1.87,1.59,4.34,2.38,7.41,2.38Z"/><path class="cls-1" d="m351.31,119.41h-23.41v-50.11c0-12.38-4.6-18.57-13.81-18.57-6.55,0-11.28,2.23-14.2,6.68s-4.37,11.66-4.37,21.64v40.36h-23.41V0h23.41v24.33c0,1.89-.18,6.34-.54,13.35l-.54,6.91h1.23c5.22-8.39,13.51-12.59,24.86-12.59,10.08,0,17.73,2.71,22.95,8.13,5.22,5.42,7.83,13.2,7.83,23.33v55.94Z"/><path class="cls-1" d="m452.23,119.41h-23.41v-50.11c0-6.19-1.04-10.83-3.11-13.93-2.07-3.09-5.33-4.64-9.78-4.64-5.99,0-10.33,2.2-13.05,6.6-2.71,4.4-4.07,11.64-4.07,21.72v40.36h-23.41V33.61h17.88l3.15,10.97h1.3c2.3-3.94,5.63-7.02,9.98-9.25,4.35-2.23,9.34-3.34,14.96-3.34,12.84,0,21.54,4.2,26.09,12.59h2.07c2.3-3.99,5.69-7.09,10.17-9.29,4.48-2.2,9.53-3.3,15.16-3.3,9.72,0,17.07,2.49,22.06,7.48,4.99,4.99,7.48,12.98,7.48,23.98v55.94h-23.48v-50.11c0-6.19-1.04-10.83-3.11-13.93-2.07-3.09-5.33-4.64-9.78-4.64-5.73,0-10.01,2.05-12.85,6.14-2.84,4.09-4.26,10.59-4.26,19.49v43.05Z"/><path class="cls-1" d="m568.56,120.94c-13.81,0-24.61-3.81-32.38-11.43-7.78-7.62-11.66-18.42-11.66-32.38s3.59-25.49,10.78-33.34c7.19-7.85,17.12-11.78,29.81-11.78s21.56,3.45,28.32,10.36c6.75,6.91,10.13,16.45,10.13,28.62v11.36h-55.33c.26,6.65,2.23,11.84,5.91,15.58,3.68,3.73,8.85,5.6,15.5,5.6,5.17,0,10.05-.54,14.66-1.61,4.6-1.07,9.41-2.79,14.43-5.14v18.11c-4.09,2.05-8.47,3.57-13.12,4.57-4.66,1-10.33,1.5-17.04,1.5Zm-3.3-72.29c-4.96,0-8.85,1.57-11.66,4.72-2.81,3.15-4.43,7.61-4.83,13.39h32.84c-.1-5.78-1.61-10.24-4.53-13.39s-6.86-4.72-11.82-4.72Z"/></svg>
    </a>
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
