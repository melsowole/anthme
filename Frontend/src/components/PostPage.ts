import Header from "./Header.js";
import PostForm from "./PostForm.js";
import Noticeboard from "./Noticeboard.js";

function renderPostPage(noticeboardTitle:string, noticeboardText:string[]):void {
    const postContainerEl = PostForm.createDOM();
    const NoticeboardEl = Noticeboard.createDOM(noticeboardTitle, noticeboardText);

    postContainerEl.append(NoticeboardEl)
    document.body.append(Header.create(), postContainerEl);
}

export {renderPostPage}