import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Notification from "../../../Models/Notification";

export default class NotificationsController {
  public async index({ request, view }: HttpContextContract) {
    let qs = request?.qs();
    let page = qs?.page ?? 1;
    let limit = qs?.page ?? 10;
    const notifications = await Notification.query()
      .preload("fromUser", (builder) => {
        builder.select("username");
      })
      .orderBy("created_at", "desc")
      .paginate(page, limit);

    return view.render("notifications/index", { notifications });
  }
}
