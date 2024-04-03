const nav = `
<nav class="dropdown">
    <label class="label open" for="__id__">
        <h3 class="list-heading">
            __heading__
        </h3>
        <span class="icon material-symbols-outlined">expand_more</span>
    </label>
    <div class="list-wrapper">
        <ul id="__id__">
        
        </ul>
    </div>
</nav>
`;

const item = `
    <li><a href="__url__"><div class="img-icon"></div> a/__item-name__</a></li>
`;



export { nav, item };
