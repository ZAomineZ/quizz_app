import { getAPI } from "../utils/Fetch";

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

      this.sidebarNotificationsButton.addEventListener("click", async () => {
        this.sidebarNotifications.classList.toggle("sidebar_open");

        // Call api read notifications
        if (this.sidebarNotifications.classList.contains("sidebar_open")) {
          const response = await getAPI("/api/notification/read");
          if (response.success) {
            const badgeHeader =
              this.sidebarNotificationsButton.querySelector(".header_badge");
            badgeHeader?.remove();
          }
        }
      });

      this.sidebarNotificationsClose.addEventListener("click", () => {
        this.sidebarNotifications.classList.remove("sidebar_open");
      });
    });
  }
}

new SidebarNotifications().init();
