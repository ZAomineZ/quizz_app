import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "../../../Models/User";
import { QuizState } from "../../../enums/QuizState";
import Quiz from "../../../Models/Quiz";

export default class CreatorController {
  public async list({ request, response }: HttpContextContract) {
    let qs = request?.qs();
    let limit = qs?.limit ?? 12;
    let page = qs?.page ?? 1;

    let creators = await User.query()
      .select("id", "username", "image")
      .distinct()
      .whereHas("quizzes", (builder) => {
        builder.where("is_public", "=", QuizState.IS_PUBLIC);
      })
      .has("quizzes", ">=", 1)
      .groupBy("id", "username")
      .paginate(page, limit);

    return response.json({
      success: true,
      creators
    });
  }

  public async show({ params, response }: HttpContextContract) {
    let creatorID = params?.id;

    // Find creator
    let creator = await User.query()
      .select("id", "username", "image")
      .where("id", "=", creatorID)
      .first();

    return response.json({
      success: true,
      creator
    });
  }

  public async quizzes({ response, params, request }: HttpContextContract) {
    let qs = request?.qs();
    let limit = qs?.limit ?? 12;
    let page = qs?.page ?? 1;
    let creatorID = params?.id;

    // Find creator
    let creator = await User.query()
      .select("id", "username", "image")
      .where("id", "=", creatorID)
      .has("quizzes", ">=", 1)
      .first();

    if (!creator) {
      return response.json({
        success: false,
        message: "This creator don't exist or don't have a quiz !"
      });
    }

    // Find quizzes
    let quizzes = await Quiz.query()
      .where("user_id", "=", creator?.id)
      .where("is_public", "=", QuizState.IS_PUBLIC)
      .paginate(page, limit);

    return response.json({
      success: true,
      quizzes
    });
  }
}
