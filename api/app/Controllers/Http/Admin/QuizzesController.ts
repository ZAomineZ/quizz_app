import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "../../../Models/Category";
import QuizValidator from "../../../Validators/QuizValidator";
import Quiz from "../../../Models/Quiz";
import { Question } from "../../../Models/Question";

export default class QuizzesController {
  public async index({ view }: HttpContextContract) {
    const quizzes = await Quiz.query().orderBy("created_at");

    return view.render("quiz/index", { quizzes });
  }

  public async create({ view }: HttpContextContract) {
    const categories = await Category.query().select("slug", "name");

    return view.render("quiz/create", { categories });
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(QuizValidator);

    let quiz = await Quiz.create(payload);

    // Create one default question
    await Question.create({
      question: "",
      good_answer: "",
      bad_answer_1: "",
      bad_answer_2: "",
      bad_answer_3: "",
      quizId: quiz.id
    });

    return response.redirect(`/quiz/${quiz.id}/edit`);
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, params }: HttpContextContract) {
    let id = params?.id;

    let quiz = await Quiz?.findOrFail(id);
    const categories = await Category.query().select("slug", "name");
    const questions = await Question.query().where("quiz_id", "=", quiz.id);

    return view.render("quiz/edit", { quiz, categories, questions });
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

  public async destroy({ params, response }: HttpContextContract) {
    let id = params?.id;

    let quiz = await Quiz.findOrFail(id);
    await quiz.delete();

    return response.redirect("/quiz");
  }
}
