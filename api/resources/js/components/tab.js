export default class Tab {
  constructor() {}

  init() {
    window.addEventListener("DOMContentLoaded", () => {
      this.tabsMenu = document.querySelectorAll(".tabs_menu");
      this.tabsMenu?.forEach((tabMenu) => {
        const navLinks = tabMenu.querySelectorAll(".nav_link");

        navLinks.forEach((navLink) => {
          navLink.addEventListener("click", () => {
            let dataTab = navLink.dataset.tab;
            let tabPane = tabMenu.querySelector(`.tab_pane#${dataTab}`);
            let tabSiblings = tabPane.parentElement.querySelectorAll(
              `.tab_pane:not(#${dataTab})`
            );
            let navLinkSiblings = navLink.parentElement.parentElement.querySelectorAll(
              `.nav_link:not([data-tab=${dataTab}])`
            );

            if (tabPane) {
              tabPane.classList.add("active");
              tabSiblings.forEach((tab) => tab.classList.remove("active"));
              navLink.classList.add("active");
              navLinkSiblings.forEach((navL) => navL.classList.remove("active"));
            } else {
              throw new DOMException("This tab don't exist in the DOM.");
            }
          });
        });
      });
    });
  }
}

new Tab().init();
