export default class AddNotificationMercure {
  constructor() {
    this.mercureEndpoint = process.env.MERCURE_ENDPOINT;
  }

  notificationElement(message, imageUser) {
    return `<div class="list d_flex align_items_center border_bottom p_3">
        <div>
            <img class="avatar bg_primary br_round avatar_md" src="${imageUser}"/>
        </div>
        <a href="#" class="wrapper w_100 ms_3">
            <p class="mb_0 d_flex">
                <b>${message}</b>
            </p>
            <div class="d_flex justify_content_between align_items_center">
                <div class="d_flex align_items_center">
                     <small class="text_muted ms_auto">30 mins ago</small>
                </div>
            </div>
        </a>
    </div>`;
  }

  badgeElement(value) {
    return `<span class="badge bg_secondary header_badge">${value}</span>`;
  }

  init() {
    window.addEventListener("DOMContentLoaded", () => {
      this.notifications = document.querySelector("#notifications");
      this.sidebarNotificationButton = document.querySelector(
        "#sidebar_notifications_button"
      );

      // Listen topic notifications
      const userID = this.notifications.dataset.user;
      const url = new URL(this.mercureEndpoint);
      url.searchParams.append("topic", `/notifications/${userID}`);

      const eventSource = new EventSource(url, { withCredentials: true });
      let { origin } = window?.location;
      eventSource.onmessage = async (event) => {
        let data = JSON.parse(event.data);
        let audio = new Audio(`${origin}/sounds/notification.wav`);
        await audio.play();
        // Increment or create badge notifications
        let headerBadge =
          this.sidebarNotificationButton.querySelector(".header_badge");
        if (headerBadge) {
          headerBadge.innerHTML = (
            parseInt(headerBadge.innerHTML) + 1
          ).toString();
        } else {
          this.sidebarNotificationButton.innerHTML += this.badgeElement(1);
        }
        // Add new notification element
        this.notifications.innerHTML =
          this.notificationElement(data.message, data?.imageUser) +
          this.notifications.innerHTML;
      };
    });
  }
}

new AddNotificationMercure().init();
