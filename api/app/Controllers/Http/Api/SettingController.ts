import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ChangeCredentialValidator from "../../../Validators/ChangeCredentialValidator";
import User from "../../../Models/User";
import ChangePasswordValidator from "../../../Validators/ChangePasswordValidator";
import Hash from "@ioc:Adonis/Core/Hash";
import { serializeAuthMe } from "../../../Serializer/AuthSerialize";
import ChangeImageValidator from "../../../Validators/ChangeImageValidator";
import { inject } from "@adonisjs/fold";
import UploadImage from "../../../Services/UploadImage";

@inject(["Upload/UserImage"])
export default class SettingController {
  constructor(protected uploadUserService: UploadImage) {}

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

  public async changeImage({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(ChangeImageValidator);

    let authUser = auth?.user;
    let user = (await User.query()
      .where("id", "=", authUser?.id)
      .first()) as User;

    // Upload new image
    if (payload.image_upload) {
      if (user.image) await this.uploadUserService.delete(user.image);

      payload["image"] = await this.uploadUserService.uploadResize(
        payload.image_upload
      );
    }
    // @ts-ignore
    delete payload["image_upload"];
    // Update user
    await user.merge({ image: payload["image"] });
    await user.save();

    return response.json({
      success: true,
      message: "You have changed your image with success !",
      image: user.image
    });
  }
}
