const postPreview = `
<article class="post preview boxed">
    <a class="unstyle" href="__link__">
        <header>
            <span class="img-icon">
                <span class="icon material-symbols-outlined">potted_plant</span>
            </span>
            <small class="category">a/__category__</small>
            <small class="timestamp">__age__ ago</small>
        </header>
        <section>
            <h2 class="title">__title__</h2>
            <p>
            __body__
            </p>
        </section>
        <footer>
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
