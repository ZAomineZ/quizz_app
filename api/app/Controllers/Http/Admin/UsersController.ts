import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "../../../Models/User";
import { inject } from "@adonisjs/fold";
import UploadUserImage from "../../../Services/UploadUserImage";
import Quiz from "../../../Models/Quiz";
import Database from "@ioc:Adonis/Lucid/Database";
import { Question } from "../../../Models/Question";

@inject(["Upload/UserImage"])
export default class UsersController {
  public constructor(protected uploadUserService: UploadUserImage) {}

  public async index({ request, view }: HttpContextContract) {
    const qs = request?.qs();

    let limit = qs.limit ? parseInt(qs.limit) : 10;
    let page = qs.page ? parseInt(qs.page) : 1;
    let search = qs.s ?? null;

    let query = User.query().orderBy("created_at");

    if (search) {
      query = query?.whereRaw(`LOWER(username) LIKE ?`, [`%${search}%`]);
    }

    let users = await query.paginate(page, limit);

    return view.render("user/index", { users, page, limit, search });
  }

  public async show({ params, view, response }: HttpContextContract) {
    let userID = params?.id;

    // Find user
    let user = (await User.query()
      .preload("statistic", (builder) => {
        builder.select("chart_quiz_month_public", "chart_quiz_category_public");
      })
      .where("id", "=", userID)
      .first()) as User | null;

    if (null === user) {
      return response.redirect().back();
    }

    // Count stats
    let quizzesCount = await Quiz.query()
      .select(Database.raw("COUNT(*) as count"))
      .first();
    let questionsCount = await Question.query()
      .select(Database.raw("COUNT(*) as count"))
      .first();

    let chartQuizMonthsPublic = user.statistic.chart_quiz_month_public;
    let chartQuizCategoryPublic = user.statistic.chart_quiz_category_public;

    return view.render("user/show", {
      user,
      quizzesCount,
      questionsCount,
      chartQuizMonthsPublic,
      chartQuizCategoryPublic
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    let id = params?.id;

    let user = await User.findOrFail(id);
    await user.delete();

    // Delete file
    if (user.image) this.uploadUserService.delete(user.image);

    return response.redirect("/quiz");
  }
}
