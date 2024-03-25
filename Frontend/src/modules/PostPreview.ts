import * as template from "../templates/post-preview.js";
import { replace, stringToDOM } from "./template-utils.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(relativeTime);

type Post = {
  id: string;
  created: number;
  category: string;
  title: string;
  body: string;
  userImg: string;
  comments: string[];
};

export default class postPreview {
  static create(post: Post): HTMLElement {
    let previewTemplate = template.postPreview;

    previewTemplate = replace(previewTemplate, [
      { pattern: "link", replacement: "/post-link" },
      { pattern: "category", replacement: post.category },
      {
        pattern: "age",
        replacement: dayjs(post.created).fromNow(),
      },
      { pattern: "title", replacement: post.title },
      { pattern: "body", replacement: post.body },
      { pattern: "comments", replacement: post.comments.length.toString() },
    ]);

    const postPreview = stringToDOM(previewTemplate);

    return postPreview;
  }
}
