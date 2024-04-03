import * as template from "./rating-element";

const postPreview = `
<article id="__postId__" class="post preview boxed">
    <a class="unstyle" href="__link__">
        <header>
            <span class="img-icon">
                <span class="icon material-symbols-outlined">potted_plant</span>
            </span>
            <small class="category">a/__category__</small>
            <small class="timestamp">__age__</small>
        </header>
        <section>
            <h2 class="title">__title__</h2>
            <p class="body">
            __body__
            </p>
        </section>
        <footer>
            <span class="pill rating">
                ${template.ratingElement}
            </span>
            <span class="pill long hover unstyle">
                <small>
                    <span class="icon material-symbols-outlined">chat</span>
                    __comments__
                </small>
            </span>
            <button class="pill long hover share">
                <small>
                    <span class="icon material-symbols-outlined">upload</span>
                    Share
                </small>
            </button>
        </footer>
    </a>
</article>
`;

export { postPreview };
