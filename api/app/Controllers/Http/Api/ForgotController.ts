import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ForgotPasswordValidator from "../../../Validators/ForgotPasswordValidator";
import User from "../../../Models/User";
import { generateToken } from "../../../utils/Token";
import Mail from "@ioc:Adonis/Addons/Mail";
import ForgotPasswordConfirmValidator from "../../../Validators/ForgotPasswordConfirmValidator";
import Env from "@ioc:Adonis/Core/Env";
import { DateTime } from "luxon";

export default class ForgotController {
  public async store({ request, response }: HttpContextContract) {
    const { email } = await request.validate(ForgotPasswordValidator);

    // Check user with email
    const user = await User.query().where("email", "=", email).first();

    if (null === user) {
      return response.json({
        success: false,
        message: "This email don't exist in our database !"
      });
    }

    // Update emailToken to current user
    user.emailTokenCreatedAt = new Date();
    user.emailToken = generateToken(32);
    await user.save();

    // Send mail
    let APP_URL = Env.get("APP_URL");
    await Mail.send((message) => {
      message
        .from(Env.get("SMTP_USERNAME"))
        .to(user.email)
        .subject("You are forget password ?")
        .htmlView("emails/recover", { user, APP_URL });
    });

    return response.json({ success: true, message: "Mail sent !" });
  }

  public async update({ request, response, params }: HttpContextContract) {
    const tokenProvided = params.token;
    const email = params.email;

    // Looking for user with the registered email
    const user = await User.query().where("email", "=", email).first();

    if (null === user) {
      return response.status(401).json({
        success: false,
        message: "This email don't exist in our database !"
      });
    }

    // checking if token is still the same
    const sameToken = tokenProvided === user?.emailToken;

    if (!sameToken) {
      return response.status(401).json({
        success: false,
        message: "Old token provided or token already used"
      });
    }

    // checking if token is still valid (48 hour period)
    let dateNow = DateTime.now();
    const dateExpired = DateTime.local().plus({ days: 2 });
    if (dateExpired < dateNow) {
      return response
        .status(401)
        .json({ success: false, message: "This token was expired !" });
    }

    // Save new password
    const payload = await request.validate(ForgotPasswordConfirmValidator);
    user.password = payload.new_password;
    user.emailToken = null;
    user.emailTokenCreatedAt = null;
    await user.save();

    return response.json({
      success: true,
      message: "You have changed your password with success !"
    });
  }
}
