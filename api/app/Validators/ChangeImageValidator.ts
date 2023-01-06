import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";

export default class QuizValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    id: this.ctx.auth.user?.id ?? null
  });

  public schema = schema.create({
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

  public messages: CustomMessages = {};
}
