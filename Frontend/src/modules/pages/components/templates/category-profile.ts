const icon = `
<span class="img-icon" style="background-color:__category-bg-color__">
    <span class="icon material-symbols-outlined" style="color:__category-text-color__">__category-icon__</span>
</span>
`;

const name = `<__tag-name__ class="category-name">a/__category-name__</__tag-name__>`;

const profile = `
    <div class="category">
        ${icon}
        ${name}
    </div>
`;

export {icon, name, profile};