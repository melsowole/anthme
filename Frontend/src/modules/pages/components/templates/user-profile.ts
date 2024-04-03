const userImg = ` <span class="hint--left hint--rounded user-img-wrapper" aria-label="View profile" > <img class="user-img"  src="__img__"> </span>`;

const username = `<small class="username">u/__username__</small>`;

const timestamp = `
<small class="timestamp">__timestamp__</small>
`;

const preview = `
    <span class="to-profile"><small>View Profile</small></span>
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
        ${preview}
        ${username}
    </a>
</div>
`;

export { userImg, userProfile, username, timestamp, userProfilePreview };
