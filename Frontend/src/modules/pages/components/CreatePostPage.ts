import Header from "./Header.ts";
import PostForm from "./PostForm.ts";
import PostNoticeboard from "./Noticeboard.ts";

function renderCreatePostPage(
  noticeboardTitle: string,
  noticeboardText: string[]
): void {
  const postContainerEl = PostForm.createDOM();
  const NoticeboardEl = PostNoticeboard.createDOM(
    noticeboardTitle,
    noticeboardText
  );

  document.body.append(Header.create(), postContainerEl, NoticeboardEl);
}

export { renderCreatePostPage };
