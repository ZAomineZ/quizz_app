import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RegisterValidator from "../../Validators/RegisterValidator";
import User from "../../Models/User";

export default class AuthController {
  public async logInView({ view }) {
    return view.render("auth/login");
  }

  public async registerView({ view }) {
    return view.render("auth/register");
  }

  public async register({ request, response }: HttpContextContract) {
    // if validation fails the request will be automatically redirected back to the form
    const payload = await request.validate(RegisterValidator);

    // Create a user record with the validated payload
    await User.create(payload);

    // Redirect to login page
    return response.redirect("/login");
  }

  public async logIn({
    request,
    auth,
    session,
    response
  }: HttpContextContract) {
    const { email, password } = request.only(["email", "password"]);

    try {
      // Attempt to login
      await auth.attempt(email, password);
    } catch (error) {
      // If login fails, return value from message and redirect back
      session.flash("form", "Your username, email or password is incorrect");
      return response.redirect().back();
    }

    return response.redirect("/dashboard");
  }

  public async logout({ response, auth }: HttpContextContract) {
    // Logout the user current
    await auth.logout();

    // redirect to login page
    return response.redirect().toRoute("loginView");
  }
}
