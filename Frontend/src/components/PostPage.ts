import Header from "./Header.ts";
import PostForm from "./PostForm.ts";
import Noticeboard from "./Noticeboard.ts";

function renderPostPage(noticeboardTitle:string, noticeboardText:string[]):void {
    const postContainerEl = PostForm.createDOM();
    const NoticeboardEl = Noticeboard.createDOM(noticeboardTitle, noticeboardText);

    postContainerEl.append(NoticeboardEl)
    document.body.append(Header.create(), postContainerEl);
}

export {renderPostPage}