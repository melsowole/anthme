import * as template from "../templates/dropdown-el.js";

type Item = {
  name: string;
  url: string;
};

type DropdownDOM = {
  dropdown: HTMLElement;
  label: HTMLElement;
  ul: HTMLElement;
  ulWrapper: HTMLElement;
};

export default class Dropdown {
  static create(label: string, items: Item[]): HTMLElement {
    let dropdownTemplate = template.nav;

    dropdownTemplate = replace(dropdownTemplate, [
      { pattern: "heading", replacement: label },
    ]);

    const dropdown: HTMLElement = stringToDOM(dropdownTemplate);

    const DOM = {
      dropdown,
      label: dropdown.querySelector("label") as HTMLElement,
      ul: dropdown.querySelector("ul") as HTMLElement,
      ulWrapper: dropdown.querySelector(".list-wrapper") as HTMLElement,
    };

    DOM.label.addEventListener("click", () => this.handleLabelClick(DOM));

    items.forEach((item) => DOM.ul.append(this.createLiEl(item)));

    return dropdown;
  }

  private static createLiEl(item: Item) {
    let liEl: string = template.item;

    liEl = replace(liEl, [
      { pattern: "url", replacement: item.url },
      { pattern: "item-name", replacement: item.name },
    ]);

    return stringToDOM(liEl);
  }

  private static handleLabelClick(DOM: DropdownDOM): void {
    DOM.label.classList.toggle("open");

    if (DOM.label.classList.contains("open")) {
      console.log("free height");
      DOM.ulWrapper.style.height = this.getUlHeight(DOM.ul);
    } else {
      console.log("no height");
      DOM.ulWrapper.style.height = "0";
    }
  }

  private static getUlHeight(ul: HTMLElement): string {
    console.log(getComputedStyle(ul).height);
    return getComputedStyle(ul).height;
  }
}

type ReplacePair = {
  pattern: string;
  replacement: string;
};

function replace(input: string, replacePairs: ReplacePair[]): string {
  let output = input;
  replacePairs.forEach((pair) => {
    output = output.replace(
      new RegExp(`__${pair.pattern}__`, "g"),
      pair.replacement
    );
  });
  return output;
}

function stringToDOM(htmlString: string): any {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, "text/html");
  return document.body.firstChild;
}
