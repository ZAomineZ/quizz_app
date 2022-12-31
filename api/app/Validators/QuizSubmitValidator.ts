import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import { QuizDifficulty } from "../enums/Quiz";

export default class QuizSubmitValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [
      rules.unique({
        table: "quizzes",
        column: "title",
        caseInsensitive: true
      }),
      rules.maxLength(255)
    ]),
    description: schema.string({ trim: true }, [rules.minLength(10)]),
    difficulty: schema.enum(Object.values(QuizDifficulty)),
    category: schema.string({ trim: true }, [
      rules.exists({ table: "categories", column: "slug" })
    ]),
    image_upload: schema.file({
      size: "2mb",
      extnames: ["jpg", "png"]
    })
  });

  public messages: CustomMessages = {};
}
