import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "../../../Models/Category";
import QuizValidator from "../../../Validators/QuizValidator";
import Quiz from "../../../Models/Quiz";

export default class QuizzesController {
  public async index({ view }: HttpContextContract) {
    return view.render("quiz/index");
  }

  public async create({ view }: HttpContextContract) {
    const categories = await Category.query().select("slug", "name");

    return view.render("quiz/create", { categories });
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(QuizValidator);

    let quiz = await Quiz.create(payload);

    return response.redirect(`/quiz/${quiz.id}/edit`);
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, params }: HttpContextContract) {
    let id = params?.id;

    let quiz = await Quiz?.findOrFail(id);
    const categories = await Category.query().select("slug", "name");

    return view.render("quiz/edit", { quiz, categories });
  }

  public async update({ params, request, response }: HttpContextContract) {
    let id = params?.id;

    let quiz = await Quiz?.findOrFail(id);

    const payload = await request.validate(QuizValidator);
    // Update quiz
    await quiz.merge(payload);
    await quiz.save();

    return response.redirect(`/quiz/${id}/edit`);
  }

  public async destroy({}: HttpContextContract) {}
}
