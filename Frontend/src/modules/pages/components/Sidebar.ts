export default class Sidebar{
    static create(content: HTMLElement[]): HTMLElement{
    const aside = document.createElement("aside");
    aside.classList.add("sidebar-aside");

    const sticky = document.createElement("div");
    sticky.classList.add("sticky-wrapper");

    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    aside.append(sticky);
    sticky.append(sidebar);

    content.forEach(el => sidebar.append(el))

    return aside;
}
}