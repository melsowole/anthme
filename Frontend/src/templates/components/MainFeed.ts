import * as template from "../main-feed.js";
import { replace, stringToDOM } from "../../modules/template-utils.js";
import PostPreview from "./PostPreview.js";

export default class MainFeed {
  static create(posts: []) {
    const main = stringToDOM(template.feed);

    posts.forEach((post) =>
      main.querySelector("#posts").append(PostPreview.create(post))
    );

    return main;
  }
}
