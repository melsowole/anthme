import * as template from "../templates/main-feed.js";
import { replace, stringToDOM } from "./template-utils.js";
import PostPreview from "./PostPreview";

export default class MainFeed {
  static create(posts: []) {
    const main = stringToDOM(template.feed);

    posts.forEach((post) =>
      main.querySelector("#posts").append(PostPreview.create(post))
    );

    return main;
  }
}
