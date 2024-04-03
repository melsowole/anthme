const upvote = `
  <?xml version="1.0" encoding="UTF-8"?><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13"><defs><style>.fill{opacity:0;}</style></defs><path class="cls-1" d="m7,.71L1.21,6.5h3.29v6h5v-6h3.29L7,.71Zm2,5.29v6h-4v-6h-2.59L7,1.41l4.59,4.59h-2.59Z"/><path class="cls-1" d="m7,0L0,7h4v6h6v-6h4L7,0Zm2,12h-4v-6h-2.59L7,1.41l4.59,4.59h-2.59v6Z"/><polygon class="fill" points="11.59 6 9 6 9 12 5 12 5 6 2.41 6 7 1.41 11.59 6"/></svg>
`;

const downvote = `
  <?xml version="1.0" encoding="UTF-8"?><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13"><defs><style>.fill{opacity:0;}</style></defs><path class="cls-1" d="m7,12.29l5.79-5.79h-3.29V.5h-5v6H1.21l5.79,5.79Zm-2-5.29V1h4v6h2.59l-4.59,4.59L2.41,7h2.59Z"/><path class="cls-1" d="m7,13l7-7h-4V0h-6v6H0l7,7ZM5,1h4v6h2.59l-4.59,4.59L2.41,7h2.59V1Z"/><polygon class="fill" points="2.41 7 5 7 5 1 9 1 9 7 11.59 7 7 11.59 2.41 7"/></svg>
`;

const ratingElement = `
  <button class="upvote"> 
      ${upvote}
  </button>
  <small>
      <span class="rating-count">__rating__</span>
  </small>
  <button class="downvote">
      ${downvote}
  </button>
`

export {ratingElement}