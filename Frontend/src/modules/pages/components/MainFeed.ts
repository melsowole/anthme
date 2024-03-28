import * as template from "./templates/main-feed.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.ts";
import PostPreview from "./PostPreview.js";
import { Post } from "../../utilities/pathTypes.ts";

export default class MainFeed {
  static create(posts: Post[]) {

    const templateFeed = replace(template.feed, [
      { pattern: "sort", replacement: "Best" },
      { pattern: "containerId", replacement: "posts" } 
    ]);

    const main = stringToDOM(templateFeed);


    if(posts.length == 0){
      main.querySelector("#posts").append(stringToDOM(template.noPosts))
    } else {
      posts.forEach((post: Post) => {
      main
        .querySelector("#posts")
        .append(
          PostPreview.create(post), 
          document.createElement("hr")
        )
    });
    }

    return main;
  }
}
