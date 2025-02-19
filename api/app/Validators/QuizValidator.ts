import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import { QuizDifficulty } from "../enums/Quiz";

export default class QuizValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    id: this.ctx.params.id ?? null
  });

  public schema = schema.create({
    title: schema.string({ trim: true }, [
      rules.unique({
        table: "quizzes",
        column: "title",
        caseInsensitive: true,
        whereNot: { id: this.refs?.id !== undefined ? this.refs?.id : null }
      }),
      rules.maxLength(255)
    ]),
    slug: schema.string({ trim: true }, [
      rules.unique({
        table: "quizzes",
        column: "slug",
        caseInsensitive: true,
        whereNot: { id: this.refs?.id !== undefined ? this.refs?.id : null }
      }),
      rules.maxLength(255)
    ]),
    description: schema.string({ trim: true }, [rules.minLength(10)]),
    difficulty: schema.enum(Object.values(QuizDifficulty)),
    category: schema.string({ trim: true }, [
      rules.exists({ table: "categories", column: "slug" })
    ]),
    is_public: schema.string.optional(),
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
