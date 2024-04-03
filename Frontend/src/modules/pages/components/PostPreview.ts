import * as template from "./templates/post-preview.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "../../utilities/types.js";
import { htmlEntitiesToString } from "../../utilities/convertToStringUtils.js";
import * as api from "../../api.js";
import CategoryProfile from "./CategoryProfile.js";

dayjs.extend(relativeTime);

export default class postPreview {
  static create(post: Post,): HTMLElement {
    let previewTemplate = template.postPreview;

    previewTemplate = replace(previewTemplate, [
      { pattern: "postId", replacement: post.id },
      { pattern: "link", replacement: `/posts/${post.id}` },
      { pattern: "age", replacement: dayjs(post.created).fromNow() },
      { pattern: "title", replacement: post.title },
      { pattern: "body", replacement: htmlEntitiesToString(post.body) },
      { pattern: "rating", replacement: (post.rating.upvotes.length - post.rating.downvotes.length).toString() },
      { pattern: "comments", replacement: post.comments.length.toString() },
    ]);

    const postPreview = stringToDOM(previewTemplate);

    // chane icon
    api.getCategory(post.category).then(category =>{
      const categoryWrapper = postPreview.querySelector(".category-wrapper") as HTMLElement;

      categoryWrapper.append(CategoryProfile.create(category, "span"))
    })

    return postPreview;
  }
}
