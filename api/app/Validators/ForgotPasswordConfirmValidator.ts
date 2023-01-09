import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { CustomMessages, rules, schema } from "@ioc:Adonis/Core/Validator";

export default class ForgotPasswordConfirmValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    new_password: schema.string({}, [
      rules.minLength(8),
      rules.maxLength(180),
      rules.confirmed("new_password_confirmation")
    ]),
    new_password_confirmation: schema.string({}, [
      rules.minLength(8),
      rules.maxLength(180)
    ])
  });

  public messages: CustomMessages = {};
}
