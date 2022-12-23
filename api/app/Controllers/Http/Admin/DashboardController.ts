import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Category from "../../../Models/Category";
import Quiz from "../../../Models/Quiz";
import Database from "@ioc:Adonis/Lucid/Database";

export default class DashboardController {
  public async index({ view }: HttpContextContract) {
    const quizzes = await Quiz.query().orderBy("created_at").limit(10);
    const categories = await Category.query().orderBy("created_at").limit(10);

    // Count stats
    let quizzesCount = await Quiz.query().select(
      Database.raw("COUNT(*) as count")
    );
    let categoriesCount = await Category.query().select(
      Database.raw("COUNT(*) as count")
    );

    return view.render("dashboard/index", {
      quizzes,
      categories,
      quizzesCount,
      categoriesCount
    });
  }
}
