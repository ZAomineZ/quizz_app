import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";

export default class QuestionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    question: schema.string({ trim: true }, [
      rules.minLength(10),
      rules.maxLength(255)
    ]),
    good_answer: schema.string({ trim: true }, [
      rules.minLength(5),
      rules.maxLength(255)
    ]),
    bad_answer_1: schema.string({ trim: true }, [
      rules.minLength(5),
      rules.maxLength(255)
    ]),
    bad_answer_2: schema.string({ trim: true }, [
      rules.minLength(5),
      rules.maxLength(255)
    ]),
    bad_answer_3: schema.string({ trim: true }, [
      rules.minLength(5),
      rules.maxLength(255)
    ])
  });

  public messages: CustomMessages = {};
}
