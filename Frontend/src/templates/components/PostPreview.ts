import * as template from "../post-preview.js";
import { replace, stringToDOM } from "../../modules/template-utils.js";

type Post = {
  id: string;
  category: string;
  title: string;
  body: string;
  userImg: string;
  created: number;
  comments: string[];
};

export default class postPreview {
  static create(post: Post): HTMLElement {
    let previewTemplate = template.postPreview;

    console.log(post.created);

    previewTemplate = replace(previewTemplate, [
      { pattern: "link", replacement: "/post-link" },
      { pattern: "category", replacement: post.category },
      { pattern: "age", replacement: "16h" }, //Update this
      { pattern: "title", replacement: post.title },
      { pattern: "body", replacement: post.body },
      { pattern: "comments", replacement: post.comments.length.toString() },
    ]);

    const postPreview = stringToDOM(previewTemplate);

    return postPreview;
  }
}
