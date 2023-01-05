import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Notification from "../../../Models/Notification";
import Database from "@ioc:Adonis/Lucid/Database";

export default class NotificationController {
  public async latest({ response }: HttpContextContract) {
    let notifications = await Notification.query()
      .orderBy("created_at", "desc")
      .limit(5);
    let notificationsUnread = await Notification.query()
      .select(Database.raw("COUNT(*) as count"))
      .where("read", "=", false);

    return response.json({
      success: true,
      notifications,
      notificationsUnread
    });
  }

  public async read({ response, auth }: HttpContextContract) {
    let user = auth.user;

    await Notification.query()
      .where("read", "=", false)
      .where("to_id", "=", user?.id)
      .update({ read: true });

    return response.json({ success: true });
  }
}
