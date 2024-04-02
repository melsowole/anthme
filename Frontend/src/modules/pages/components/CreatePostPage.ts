import Header from "./Header.ts";
import PostForm from "./PostForm.ts";
import Noticeboard from "./Noticeboard.ts";
import { Category } from "../../utilities/types.ts";

class CreatePostPage {
  static create(
    categories: Category[],
    noticeboardTitle: string,
    noticeboardText: string[]
  ): void {
    const postContainerEl = PostForm.create(categories);
    const NoticeboardEl = Noticeboard.create(noticeboardTitle, noticeboardText);
    NoticeboardEl.classList.add("light");

    document.body.append(Header.create(), postContainerEl, NoticeboardEl);
  }
}

export { CreatePostPage };
