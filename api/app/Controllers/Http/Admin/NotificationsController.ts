import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class NotificationsController {
  public async index({ view }: HttpContextContract) {
    return view.render("notifications/index");
  }
}
