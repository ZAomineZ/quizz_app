import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Quiz from "../../../Models/Quiz";
import Category from "../../../Models/Category";
import QuizSubmitValidator from "../../../Validators/QuizSubmitValidator";
import { QuizState } from "../../../enums/QuizState";
import { inject } from "@adonisjs/fold";
import UploadQuizImage from "../../../Services/UploadQuizImage";

@inject(["Upload/QuizImage"])
export default class QuizController {
  public constructor(protected uploadQuizService: UploadQuizImage) {}

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

  public async show({ response, params }: HttpContextContract) {
    let slug = params?.slug ?? null;

    let quiz = await Quiz.query()
      .where("slug", "=", slug)
      .with("category", (builder) => {
        builder.select("*");
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
      .limit(limit);

    return response.json({
      success: true,
      quizzes
    });
  }

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
    await Quiz.create({
      ...payload,
      categoryId: category.id,
      user_id: user?.id
    });

    return response.json({
      success: true,
      message:
        "You have proposed this quiz with success, our admin will be able to approve this in the next few hours !"
    });
  }
}
