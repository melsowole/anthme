import * as template from "./templates/post-preview.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "../../utilities/types.js";
import { htmlEntitiesToString } from "../../utilities/convertToStringUtils.js";
import {DeleteContentBtn} from"./DeleteContentBtn.js";
import { filterCookieValue } from "../../utilities/cookieUtils.js";


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
      { pattern: "body", replacement: htmlEntitiesToString(post.body) },
      { pattern: "rating", replacement: (post.rating.upvotes.length - post.rating.downvotes.length).toString() },
      { pattern: "comments", replacement: post.comments.length.toString() },
    ]);

    const postPreview = stringToDOM(previewTemplate);

    postPreview.classList.add("profile-item");

    const loggedInUserId = filterCookieValue('id', 'user');
    if (post.user.id === loggedInUserId) {
      const deleteBtn = DeleteContentBtn.create("post");
      postPreview.append(deleteBtn);
      
  } 

    return postPreview;
  }
}
