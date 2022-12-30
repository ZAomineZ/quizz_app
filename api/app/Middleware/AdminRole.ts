import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { UserRole } from "../enums/UserRole";

export default class AdminRole {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    let user = auth.user;

    if (user && user.role_id !== UserRole.ADMIN) {
      return response.redirect().toRoute("home");
    }

    await next();
  }
}
