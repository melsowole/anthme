import * as template from "../templates/main-nav.js";
import { stringToDOM, replace } from "../modules/template-utils.js";
import Dropdown from "./DropdownElement.js";

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
      link: "/",
    },
  ];

  private static dropdowns = [
    {
      label: "Communities",
      id: "dropdown-community",
      items: [
        {
          name: "Food",
          url: "/food",
        },
        {
          name: "Music",
          url: "/music",
        },
        {
          name: "Guitar",
          url: "/guitar",
        },
      ],
    },
  ];

  static create(): HTMLElement {
    const navTemplate = template.nav;

    const nav = stringToDOM(navTemplate);

    const feedsContainer = nav.querySelector(".feed ul");
    const dropdownContainer = nav.querySelector("#dropdowns");

    this.feeds.forEach((feed) =>
      feedsContainer.append(this.createFeedLiItem(feed))
    );

    this.dropdowns.forEach((dropdown) => {
      dropdownContainer.append(
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
