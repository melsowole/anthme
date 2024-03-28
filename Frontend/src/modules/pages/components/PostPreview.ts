import * as template from "./templates/post-preview.ts";
import { replace, stringToDOM } from "../../utilities/templateUtils.ts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "../../utilities/pathTypes.ts";

dayjs.extend(relativeTime);

export default class postPreview {
  static create(post: Post): HTMLElement {
    let previewTemplate = template.postPreview;

    previewTemplate = replace(previewTemplate, [
      { pattern: "postId", replacement: post.id },
      { pattern: "link", replacement: `/posts/${post.id}` },
      { pattern: "category", replacement: post.category },
      { pattern: "age", replacement: dayjs(post.created).fromNow() },
      { pattern: "title", replacement: post.title },
      { pattern: "body", replacement: post.body },
      { pattern: "comments", replacement: post.comments.length.toString() },
    ]);

    const postPreview = stringToDOM(previewTemplate);

    return postPreview;
  }
}
