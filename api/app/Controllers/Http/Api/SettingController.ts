import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ChangeCredentialValidator from "../../../Validators/ChangeCredentialValidator";
import User from "../../../Models/User";
import ChangePasswordValidator from "../../../Validators/ChangePasswordValidator";
import Hash from "@ioc:Adonis/Core/Hash";
import { serializeAuthMe } from "../../../Serializer/AuthSerialize";

export default class SettingController {
  public async changeCredentials({
    request,
    response,
    auth
  }: HttpContextContract) {
    const payload = await request.validate(ChangeCredentialValidator);

    let authUser = auth?.user;
    let user = (await User.query()
      .where("id", "=", authUser?.id)
      .first()) as User;

    // Change credentials
    let newUser = await user?.merge({
      username: payload.username,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name
    });
    await newUser.save();

    return response.json({
      success: true,
      message: "You have changed your credentials with success !",
      user: newUser.serialize(serializeAuthMe)
    });
  }

  public async changePasswords({
    request,
    response,
    auth
  }: HttpContextContract) {
    const payload = await request.validate(ChangePasswordValidator);

    let authUser = auth?.user;
    let user = (await User.query()
      .where("id", "=", authUser?.id)
      .first()) as User;

    // Check current password
    if (!(await Hash.verify(user.password, payload.password_current))) {
      response.json({ success: false, message: "This password is invalid !" });
    }

    // Change password
    await user.merge({ password: payload.new_password });
    await user.save();

    return response.json({
      success: true,
      message: "You have changed your password with success !"
    });
  }
}
