import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Category from "../../../Models/Category";
import Quiz from "../../../Models/Quiz";

export default class DashboardController {
  public async index({ view }: HttpContextContract) {
    const quizzes = await Quiz.query().orderBy("created_at").limit(10);
    const categories = await Category.query().orderBy("created_at").limit(10);

    // Count stats

    return view.render("dashboard/index", { quizzes, categories });
  }
}
