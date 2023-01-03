import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CategoryValidator {
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
    name: schema.string({ trim: true }, [
      rules.unique({
        table: "categories",
        column: "name",
        caseInsensitive: true
      }),
      rules.maxLength(255)
    ]),
    slug: schema.string({ trim: true }, [
      rules.unique({
        table: "categories",
        column: "slug",
        caseInsensitive: true
      }),
      rules.maxLength(255)
    ]),
    description: schema.string({ trim: true }, [rules.minLength(10)]),
    image_upload:
      this.refs?.id !== undefined
        ? schema.file.optional({
            size: "2mb",
            extnames: ["jpg", "png"]
          })
        : schema.file({
            size: "2mb",
            extnames: ["jpg", "png"]
          })
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
