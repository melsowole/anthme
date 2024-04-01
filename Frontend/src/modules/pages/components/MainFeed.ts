import * as template from "./templates/main-feed.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.ts";
import PostPreview from "./PostPreview.js";
import { Category, Post, Rating } from "../../utilities/types.ts";

export default class MainFeed {

  static create(posts: Post[], category?: Category|false) {

    const templateFeed = replace(template.feed, [{pattern: 'containerType', replacement: 'posts'}])
    const main = stringToDOM(templateFeed);

    const header = category ? categoryHeader(category) : stringToDOM(template.homePageHeader);

    main.prepend(header);


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

function categoryHeader(category: Category): HTMLElement{
    const headerTemplate = replace(template.categoryHeader, [
      {pattern: "category", replacement: category.name},
      {pattern: "color", replacement: category.color},
      {pattern: "icon", replacement: category.icon}, 
    ]);

    const header = stringToDOM(headerTemplate);

    header.querySelector(".icon").style.color = getContrastColor(category.color);

    return header;
}

// Thanks ChatGPT
function getContrastColor(hexColor: string): 'black' | 'white' {
    const r = parseInt(hexColor.substring(1, 2), 16);
    const g = parseInt(hexColor.substring(3, 2), 16);
    const b = parseInt(hexColor.substring(5, 2), 16);

    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    return luminance > 0.5 ? 'black' : 'white';
}
