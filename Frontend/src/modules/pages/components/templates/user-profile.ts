const userImg = ` <img class="user-img" src="__img__">`;

const username = `<small class="username">u/__username__</small>`;

const timestamp = `
<small class="timestamp">__timestamp__</small>
`;

const preview = `
    <span class="to-profile">View Profile</span>
`;

const userProfile = `
<div class="user __size__">
    ${userImg}
    ${username}
</div>
`;

const userProfilePreview = `
<div class="user preview">
    <a href="__link__" class="unstyle">
        ${userImg}
        ${username}
        ${preview}
    </a>
</div>
`;

export { userImg, userProfile, username, timestamp, userProfilePreview };
