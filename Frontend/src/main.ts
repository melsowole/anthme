import Dropdown from "./modules/DropdownElement";

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
