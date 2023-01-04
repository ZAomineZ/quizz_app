export default class SidebarNotifications {
  constructor() {}

  init() {
    window.addEventListener("DOMContentLoaded", () => {
      this.sidebarNotifications = document.querySelector(
        "#sidebar_notification"
      );
      this.sidebarNotificationsButton = document.querySelector(
        "#sidebar_notifications_button"
      );
      this.sidebarNotificationsClose = document.querySelector(
        ".sidebar_right_remove"
      );

      this.sidebarNotificationsButton.addEventListener("click", () => {
        this.sidebarNotifications.classList.toggle("sidebar_open");
      });

      this.sidebarNotificationsClose.addEventListener("click", () => {
        this.sidebarNotifications.classList.remove("sidebar_open");
      });
    });
  }
}

new SidebarNotifications().init();
