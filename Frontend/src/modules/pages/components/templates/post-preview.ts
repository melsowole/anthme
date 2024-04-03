const postPreview = `
<article id="__postId__" class="post preview boxed">
    <a class="unstyle" href="__link__">
        <header>
            <div class="category-wrapper"></div>
            <small class="timestamp">__age__</small>
        </header>
        <section>
            <h2 class="title">__title__</h2>
            <p class="body">
            __body__
            </p>
        </section>
        <footer>
            <span class="outer-span">
                <button class="button-up"> 
                    <i class="fi fi-ts-up"></i> 
                </button>
                <span class="rating">__rating__</span>
                <button class="button-down">
                    <i class="fi fi-ts-down"></i>
                </button>
            </span>
            <span class="pill unstyle">
                <small>
                    <span class="icon material-symbols-outlined">comment</span>
                    __comments__
                </small>
            </span>
            <button class="pill share">
                <small>
                    <span class="icon material-symbols-outlined">share</span>
                    Share
                </small>
            </button>
        </footer>
    </a>
</article>
`;

export { postPreview };
