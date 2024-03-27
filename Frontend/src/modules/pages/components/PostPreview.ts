import * as template from "./templates/post-preview.ts"
import {replace, stringToDOM} from "../../utilities/templateUtils.ts";
import { Post } from "../../utilities/pathTypes.ts";

export default class postPreview {
  static create(post: Post): HTMLElement {
    let previewTemplate = template.postPreview;

    previewTemplate = replace(previewTemplate, [
      { pattern: "postId", replacement: post.id },
      { pattern: "link", replacement: `/posts/${post.id}` },
      { pattern: "category", replacement: post.category }, //Update this
      { pattern: "age", replacement: "16h" }, //Update this
      { pattern: "title", replacement: post.title },
      { pattern: "body", replacement: post.body },
      { pattern: "comments", replacement: post.comments.length.toString() },
    ]);

    const postPreview = stringToDOM(previewTemplate);

    return postPreview;
  }
}
