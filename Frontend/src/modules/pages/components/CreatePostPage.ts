import Header from "./Header.ts";
import PostForm from "./PostForm.ts";
import PostNoticeboard from "./PostNoticeboard.ts";

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

  document.body.append();
}

export { renderCreatePostPage };
