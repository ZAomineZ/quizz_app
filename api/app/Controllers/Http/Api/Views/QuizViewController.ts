import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ViewsQuiz from "../../../../Models/ViewsQuiz";
import Quiz from "../../../../Models/Quiz";

export default class QuizViewController {
  public async createView({ params, response, request }: HttpContextContract) {
    let clientIP = request?.ip();
    let quizSlug = params?.slug as number;

    // Create view
    const quiz = (await Quiz.query()
      .where("slug", "=", quizSlug)
      .first()) as Quiz;
    console.log(quiz);
    const viewQuiz = await ViewsQuiz.query()
      .where("ip", "=", clientIP)
      .where("quiz_id", "=", quiz?.id)
      .first();

    if (!viewQuiz) {
      await ViewsQuiz.create({
        ip: clientIP,
        quiz_id: quiz?.id
      });
    }

    return response.ok({});
  }
}
