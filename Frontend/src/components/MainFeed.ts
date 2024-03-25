import * as template from "../templates/main-feed.js";
import { replace, stringToDOM } from "../modules/template-utils.js";
import PostPreview from "./PostPreview.js";

export default class MainFeed {
  static create(posts: []) {
    const templateFeed = replace(template.feed, [
      { pattern: "sort", replacement: "Best" },
      { pattern: "containerId", replacement: "posts" },
    ]);

    const main = stringToDOM(templateFeed);

    posts.forEach((post) =>
      main
        .querySelector("#posts")
        .append(PostPreview.create(post), document.createElement("hr"))
    );

    return main;
  }
}
