const feed = `
  <main class="main-feed">
    <!--header goes here-->
    <hr />
    <div id="__containerType__"></div>
  </main>
`;

const categoryHeader = `
  <header class="category">
    <span class="img-icon" style="background-color:__color__">
      <span class="icon material-symbols-outlined">__icon__</span>
    </span>
    <h2 class="category-name">__category__</h2>
  </header>
`;

const homePageHeader = `
  <h2>All Posts</h2>
`;

const noPosts = `
  <div>No posts yet...</div>
`;


export { feed, categoryHeader, homePageHeader, noPosts };

