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
}
