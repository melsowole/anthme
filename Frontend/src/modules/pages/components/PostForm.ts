import * as template from "./templates/post-form.ts";
import PostFormDropdownOption from "./PostFormDropdownOption.ts";
import {replace, stringToDOM} from "../../utilities/templateUtils.ts";
import { Category } from "../../utilities/pathTypes.ts";
import Quill from "quill";

export default class PostForm {
    static create(categories: Category[]): HTMLDivElement {
        const mainContainerEl = stringToDOM(template.mainContainer);
        const postFormDropdown = mainContainerEl.querySelector('.category-container > select') as HTMLSelectElement;

        categories.forEach(category => {
            postFormDropdown.append(PostFormDropdownOption.create(category))
        })

        const textEditorContainer = mainContainerEl.querySelector('#textEditor')

        const quill = new Quill(textEditorContainer, {
            modules: {
                toolbar: [
                    [
                        'bold',
                        'italic',
                        'link',
                        'strike',
                        'code',
                        {script: 'super'},
                    ],
                    [
                        {header: 1},
                        {list: 'bullet'},
                        {list: 'ordered'},
                        'blockquote',
                        'code-block',
                        'image',
                        'video',
                    ],
                ],
                clipboard: {matchVisual: false} as any
            },
            placeholder: 'Text',
            theme: 'snow',
        })

        const toolbar = quill.getModule('toolbar');
        if (toolbar) toolbar.addHandler('image', imageHandler);

        function imageHandler() {
            const range = quill.getSelection();
            if(range !== null) {
                const url = prompt('Enter the URL of the image:');
                if (url) {
                    quill.focus();
                    quill.insertEmbed(range.index, 'image', url, Quill.sources.USER);

                    // Qull editor does not support adding custom classes
                    // Adding classes to created images by linked url
                    setTimeout(() => {
                        const images = document.querySelectorAll('.ql-editor img[src="' + url + '"]');
                        images.forEach((image: Element) => {
                            image.classList.add('linked-image');
                        });
                    }, 1);
                }
            }
        }
        
        const textEditorToolbar = mainContainerEl.querySelector('.ql-toolbar');
        const divContentEditable = textEditorContainer.querySelector('.ql-editor');

        textEditorContainer.classList.add('anthme-editor-container');
        textEditorToolbar.classList.add('anthme-toolbar');
        divContentEditable.classList.add('check-form-validity');

        return mainContainerEl;
    }
}
