import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RegisterValidator from "../../../Validators/RegisterValidator";
import User from "../../../Models/User";
import LoginValidator from "../../../Validators/LoginValidator";

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator);

    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "1 days"
    });

    return response.ok({
      user: { ...token.user, token: token.token }
    });
  }

  public async register({ request, response }: HttpContextContract) {
    // if validation fails the request will be automatically redirected back to the form
    const payload = await request.validate(RegisterValidator);

    // Create a user record with the validated payload
    const newUser = await User.create(payload);

    return response.created(newUser);
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("api").logout();

    return response.ok({});
  }

  public async me({ auth, response }: HttpContextContract) {
    return response.ok({ user: auth.user ?? null });
  }
}
