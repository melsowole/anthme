import Header from "./Header.ts";
import PostForm from "./PostForm.ts";
import PostNoticeboard from "./PostNoticeboard.ts";
import { Category } from "../../utilities/pathTypes.ts";

class CreatePostPage {
    static create(categories: Category[], noticeboardTitle: string, noticeboardText: string[]): void {
        const postContainerEl = PostForm.create(categories);
        const NoticeboardEl = PostNoticeboard.create(noticeboardTitle, noticeboardText);
        postContainerEl.append(NoticeboardEl)
        
        document.body.append(
            Header.create(),
            postContainerEl);
    }
}

export {CreatePostPage}