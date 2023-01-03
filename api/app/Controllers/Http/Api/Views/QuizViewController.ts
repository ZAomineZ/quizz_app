import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ViewsQuiz from "../../../../Models/ViewsQuiz";
import Quiz from "../../../../Models/Quiz";
import Category from "../../../../Models/Category";

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

  public async mostViews({ response }: HttpContextContract) {
    let quizzes = await Quiz.query()
      .withCount("viewsQuiz")
      .orderBy("viewsQuiz_count", "desc")
      .where("is_public", "=", 1)
      .limit(4);

    return response.json({
      success: true,
      quizzes
    });
  }

  public async mostViewTwoCategory({ response }: HttpContextContract) {
    let categories = await Category.query()
      .withCount("viewsCategory")
      .orderBy("viewsCategory_count", "desc")
      .limit(2);

    let categoryFirstID = categories[0]?.id;
    let categorySecondID = categories[1]?.id;
    let categoryFirstName = categories[0]?.name;
    let categorySecondName = categories[1]?.name;

    let quizzesFirstCategory = await Quiz.query()
      .where("category_id", "=", categoryFirstID)
      .withCount("viewsQuiz")
      .orderBy("viewsQuiz_count", "desc")
      .limit(4);
    let quizzesSecondCategory = await Quiz.query()
      .where("category_id", "=", categorySecondID)
      .withCount("viewsQuiz")
      .orderBy("viewsQuiz_count", "desc")
      .limit(4);

    return response.json({
      success: true,
      quizzesFirstCategory,
      quizzesSecondCategory,
      categoryFirstName,
      categorySecondName
    });
  }
}
