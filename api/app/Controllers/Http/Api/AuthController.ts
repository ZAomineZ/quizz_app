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

    let userSerialize = await this?.serializeUser(token.user as User);

    return response.ok({
      user: { ...userSerialize, token: token.token }
    });
  }

  public async register({ request, response }: HttpContextContract) {
    // if validation fails the request will be automatically redirected back to the form
    const payload = await request.validate(RegisterValidator);

    // Create a user record with the validated payload
    const newUser = await User.create(payload);

    return response.created({ user: newUser.serialize() });
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("api").logout();
    await auth.use("api").revoke();

    return response.ok({});
  }

  public async me({ auth, response }: HttpContextContract) {
    let user = auth?.user as User;
    return response.ok({ user: await this.serializeUser(user) });
  }

  private async serializeUser(user: User) {
    return {
      username: user?.username,
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      image: user?.image
    };
  }
}
