import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Category from "../../../Models/Category";
import Quiz from "../../../Models/Quiz";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "../../../Models/User";
import { Question } from "../../../Models/Question";
import Statistic from "../../../Models/Statistic";

export default class DashboardController {
  public async index({ view, auth }: HttpContextContract) {
    let user = auth?.user;

    const quizzes = await Quiz.query()
      .preload("category")
      .withCount("questions")
      .orderBy("created_at")
      .limit(10);
    const categories = await Category.query().orderBy("created_at").limit(10);

    // Count stats
    let quizzesCount = await Quiz.query()
      .select(Database.raw("COUNT(*) as count"))
      .first();
    let categoriesCount = await Category.query()
      .select(Database.raw("COUNT(*) as count"))
      .first();
    let questionsCount = await Question.query()
      .select(Database.raw("COUNT(*) as count"))
      .first();
    let usersCount = await User.query()
      .select(Database.raw("COUNT(*) as count"))
      .first();

    let statistic = await Statistic.query()
      .where("user_id", "=", user?.id)
      .first();

    let chartQuizMonthUsers = statistic?.chart_quiz_month_users;
    let chartQuizByCategoryUsers = statistic?.chart_quiz_by_category_users;
    let chartQuizByMonthsPercentage =
      statistic?.chart_quiz_by_months_percentage;
    let chartQuizByCategoryPercentage =
      statistic?.chart_quiz_by_category_percentage;

    return view.render("dashboard/index", {
      quizzes,
      categories,
      quizzesCount,
      categoriesCount,
      usersCount,
      questionsCount,
      chartQuizMonthUsers,
      chartQuizByCategoryUsers,
      chartQuizByMonthsPercentage,
      chartQuizByCategoryPercentage
    });
  }
}
