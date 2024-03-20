import Dropdown from "./modules/DropdownElement";
import PostPreview from "./modules/PostPreview";

const url = "http://localhost:3000/posts";

fetch(url)
  .then((r) => r.json())
  .then((posts) => {
    const container = document.getElementById("posts") as HTMLElement;
    posts.forEach((post) => {
      container.append(PostPreview.create(post), document.createElement("hr"));
    });
  });

document.getElementById("dropdowns")?.append(
  Dropdown.create("communities", [
    { name: "hello", url: "hi" },
    { name: "annyeong", url: "hoi" },
  ]),
  document.createElement("hr"),
  Dropdown.create("communities", [
    { name: "hello", url: "hi" },
    { name: "annyeong", url: "hoi" },
  ])
);
