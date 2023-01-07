import { CustomMessages, rules, schema } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { UserRole } from "../enums/UserRole";

export default class ChangeCredentialValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    id: this.ctx.params.id ?? null
  });

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.unique({
        table: "users",
        column: "username",
        caseInsensitive: true,
        whereNot: { id: this.refs?.id !== undefined ? this.refs?.id : null }
      }),
      rules.maxLength(255)
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({
        table: "users",
        column: "email",
        caseInsensitive: true,
        whereNot: { id: this.refs?.id !== undefined ? this.refs?.id : null }
      })
    ]),
    first_name: schema.string({ trim: true }, [rules.maxLength(255)]),
    last_name: schema.string({ trim: true }, [rules.maxLength(255)]),
    role: schema.enum([UserRole.USER.toString(), UserRole.ADMIN.toString()])
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {};
}
