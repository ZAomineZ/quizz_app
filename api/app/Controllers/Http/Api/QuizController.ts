import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Quiz from "../../../Models/Quiz";

export default class QuizController {
  public async latest({ response, params }: HttpContextContract) {
    let limit = params?.limit ?? 4;

    let quizzes = await Quiz.query().orderBy("created_at").limit(limit);
    return response.json({
      success: true,
      quizzes
    });
  }

  public async show({ response, params }: HttpContextContract) {
    let slug = params?.slug ?? null;

    let quiz = await Quiz.query()
      .where("slug", "=", slug)
      .with("category", (builder) => {
        builder.select("*");
      });

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
      .limit(limit);

    return response.json({
      success: true,
      quizzes
    });
  }
}
