import * as template from "./templates/main-feed.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.ts";
import PostPreview from "./PostPreview.js";
import { Category, Post } from "../../utilities/pathTypes.ts";

export default class MainFeed {
  static create(posts: Post[], category?: Category|false) {

    const main = stringToDOM(template.feed);

    console.log(category)

    const header = category ? categoryHeader(category) : stringToDOM(template.homePageHeader);

    main.prepend(header);

    posts.forEach((post) =>
      main
        .querySelector("#posts")
        .append(PostPreview.create(post), document.createElement("hr"))
    );

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
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    return luminance > 0.5 ? 'black' : 'white';
}
