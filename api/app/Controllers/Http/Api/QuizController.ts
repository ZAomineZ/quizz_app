import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Quiz from "../../../Models/Quiz";
import { QuizState } from "../../../enums/QuizState";
import { inject } from "@adonisjs/fold";
import Category from "../../../Models/Category";

@inject(["Upload/QuizImage"])
export default class QuizController {
  public async latest({ response, params }: HttpContextContract) {
    let limit = params?.limit ?? 4;

    let quizzes = await Quiz.query()
      .where("is_public", "=", QuizState.IS_PUBLIC)
      .orderBy("created_at")
      .limit(limit);
    return response.json({
      success: true,
      quizzes
    });
  }

  public async byCategory({ response, params }: HttpContextContract) {
    let limit = params?.limit ?? 18;
    let page = params?.page ?? 1;
    let categorySlug = params?.categorySlug;

    let category = (await Category.query()
      .where("slug", "=", categorySlug)
      .first()) as Category;
    let quizzes = await Quiz.query()
      .where("category_id", "=", category?.id)
      .where("is_public", "=", QuizState.IS_PUBLIC)
      .paginate(page, limit);

    return response.json({
      success: true,
      quizzes
    });
  }

  public async show({ response, params }: HttpContextContract) {
    let slug = params?.slug ?? null;

    let quiz = await Quiz.query()
      .where("slug", "=", slug)
      .preload("category", (builder) => {
        builder.select("name", "slug");
      })
      .preload("user", (builder) => {
        builder.select("username");
      })
      .firstOrFail();

    return response.json({
      success: true,
      quiz
    });
  }

  public async questions({ response, params }: HttpContextContract) {
    let slug = params?.slug ?? null;

    let quiz = await Quiz.query()
      .select("id", "title")
      .where("slug", "=", slug)
      .preload("questions", (builder) => {
        builder.select([
          "question",
          "good_answer",
          "bad_answer_1",
          "bad_answer_2",
          "bad_answer_3"
        ]);
      })
      .firstOrFail();

    return response.json({
      success: true,
      quiz
    });
  }

  public async search({ response, params }: HttpContextContract) {
    let search = params?.s ?? "";
    let limit = params?.limit ?? 18;

    let quizzes = await Quiz.query()
      .whereRaw("title like %?%", [search])
      .limit(limit);

    return response.json({
      success: true,
      quizzes
    });
  }

  public async category({ response, params }: HttpContextContract) {
    let categoryID = params?.categoryId;
    let limit = params?.limit ?? 18;

    let quizzes = await Quiz.query()
      .where("category_id", "=", categoryID)
      .where("is_public", "=", QuizState.IS_PUBLIC)
      .limit(limit);

    return response.json({
      success: true,
      quizzes
    });
  }
}
