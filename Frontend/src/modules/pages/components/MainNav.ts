import * as template from "./templates/main-nav.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.ts";
import Dropdown from "./DropdownElement.js";
import { MainCategory } from "../../utilities/pathTypes.ts";

type FeedItem = {
  link: string;
  icon: string;
  name: string;
};

export default class MainNav {
  private static feeds = [
    {
      name: "Home",
      icon: "home",
      link: "", //tog bort / eftersom den href:a två // styckna
    },
  ];

  static create(dropdowns: MainCategory[]): HTMLElement {
    const navTemplate = template.nav;

    const nav = stringToDOM(navTemplate);

    const feedsContainer = nav.querySelector(".feed ul");
    const dropdownContainer = nav.querySelector("#dropdowns");

    this.feeds.forEach((feed) =>
      feedsContainer.append(this.createFeedLiItem(feed))
    );

    dropdowns.forEach((dropdown) => {
      dropdownContainer.append(
        document.createElement("hr"),
        Dropdown.create(dropdown.label, dropdown.id, dropdown.items)
      );
    });

    return nav;
  }

  private static createFeedLiItem(item: FeedItem): HTMLElement {
    let feedItemTemplate = template.feedItem;

    feedItemTemplate = replace(feedItemTemplate, [
      { pattern: "link", replacement: item.link },
      { pattern: "icon", replacement: item.icon },
      { pattern: "name", replacement: item.name },
    ]);

    return stringToDOM(feedItemTemplate);
  }
}
