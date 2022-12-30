import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ChangeCredentialValidator from "../../Validators/ChangeCredentialValidator";
import User from "../../Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import ChangePasswordValidator from "../../Validators/ChangePasswordValidator";

export default class SettingsController {
  public async changeCredentialsView({ view, auth }: HttpContextContract) {
    const user = auth?.user;

    return view.render("settings/change_credentials", { user });
  }

  public async changePasswordView({ view, auth }: HttpContextContract) {
    const user = auth?.user;

    return view.render("settings/change_password", { user });
  }

  public async changeCredentials({
    request,
    response,
    auth,
    session
  }: HttpContextContract) {
    const payload = await request.validate(ChangeCredentialValidator);

    let authUser = auth?.user;
    let user = (await User.query()
      .where("id", "=", authUser?.id)
      .first()) as User | null;

    if (!user) {
      session.flash("error", "This user don't exist !");
      return response.redirect().back();
    }

    // Change credentials
    user.username = payload.username;
    user.email = payload.email;
    user.first_name = payload.first_name;
    user.last_name = payload.last_name;
    await user?.save();

    session.flash(
      "success",
      "You have changed your credentials with success !"
    );
    return response.redirect().back();
  }

  public async changePassword({
    request,
    auth,
    session,
    response
  }: HttpContextContract) {
    const payload = await request.validate(ChangePasswordValidator);

    let authUser = auth?.user;
    let user = (await User.query()
      .where("id", "=", authUser?.id)
      .first()) as User | null;

    if (!user) {
      session.flash("error", "This user don't exist !");
      return response.redirect().back();
    }

    // Check current password
    if (!(await Hash.verify(user.password, payload.password_current))) {
      session.flash("error", "This password is invalid !");
      return response.redirect().back();
    }

    // Change password
    user.password = payload.new_password;
    await user.save();

    session.flash("success", "You have changed your password with success !");
    return response.redirect().back();
  }
}
