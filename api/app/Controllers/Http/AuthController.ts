// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async logInView({ view }) {
    return view.render("login");
  }

  public async logIn() {}
}
