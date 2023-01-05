import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Notification from "../Models/Notification";
import Database from "@ioc:Adonis/Lucid/Database";

export default class GlobalView {
  public async handle(
    { view, auth }: HttpContextContract,
    next: () => Promise<void>
  ) {
    let user = auth.user;

    if (user) {
      // Notifications
      let notifications = await Notification.query()
        .orderBy("created_at", "desc")
        .limit(5);
      let notificationsUnread = await Notification.query()
        .select(Database.raw("COUNT(*) as count"))
        .where("read", "=", false)
        .first();

      view.share({
        notificationsSidebar: notifications,
        notificationsUnread: notificationsUnread?.$extras.count ?? 0
      });
    }

    await next();
  }
}
