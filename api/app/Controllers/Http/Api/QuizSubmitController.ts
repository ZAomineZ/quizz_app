import UploadQuizImage from "../../../Services/UploadQuizImage";
import { inject } from "@adonisjs/fold";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import QuizSubmitValidator from "../../../Validators/QuizSubmitValidator";
import Category from "../../../Models/Category";
import Quiz from "../../../Models/Quiz";
import QuestionValidator from "../../../Validators/QuestionValidator";
import { Question } from "../../../Models/Question";

@inject(["Upload/QuizImage"])
export default class QuizSubmitController {
  public constructor(protected uploadQuizService: UploadQuizImage) {}

  public async submit({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(QuizSubmitValidator);

    // Auth user
    let user = auth?.user;

    let category = await Category.query()
      .where("slug", "=", payload.category)
      .first();
    if (!category) {
      return response.json({
        success: false,
        message: "This category selected don't exist !"
      });
    }

    // Image upload
    payload["image"] = await this.uploadQuizService.upload(payload);
    // @ts-ignore
    delete payload["image_upload"];
    // Create quiz
    const quiz = await Quiz.create({
      ...payload,
      categoryId: category.id,
      user_id: user?.id
    });

    return response.json({
      success: true,
      message:
        "You have proposed this quiz with success, our admin will be able to approve this in the next few hours !",
      quizID: quiz?.id
    });
  }

  public async submitQuestion({
    params,
    response,
    request
  }: HttpContextContract) {
    let quizID = params?.id;

    let quiz = await Quiz.query().where("id", "=", quizID).first();
    if (!quiz) {
      return response.json({
        success: false,
        message: "You can't create a question on a quiz that does not exist !"
      });
    }

    const payload = await request.validate(QuestionValidator);
    // Create question on current quiz
    await Question.create({ ...payload, quiz_id: quiz?.id });

    return response.json({
      success: true,
      message: "You are create your question with success !"
    });
  }
}
