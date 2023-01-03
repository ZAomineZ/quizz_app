import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Category from "../../../Models/Category";
import Quiz from "../../../Models/Quiz";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "../../../Models/User";
import { Question } from "../../../Models/Question";
import { inject } from "@adonisjs/fold";
import QuizCreateUsers from "../../../Services/Chart/QuizCreateUsers";
import QuizByCategory from "../../../Services/Chart/QuizByCategory";

@inject(["Chart/QuizCreateUsers", "Chart/QuizByCategory"])
export default class DashboardController {
  public constructor(
    protected quizCreateUsers: QuizCreateUsers,
    protected quizByCategory: QuizByCategory
  ) {}

  public async index({ view, auth }: HttpContextContract) {
    let user = auth?.user;

    const quizzes = await Quiz.query()
      .preload("category")
      .orderBy("created_at")
      .limit(10);
    const categories = await Category.query().orderBy("created_at").limit(10);

    // Count stats
    let quizzesCount = await Quiz.query().select(
      Database.raw("COUNT(*) as count")
    );
    let categoriesCount = await Category.query().select(
      Database.raw("COUNT(*) as count")
    );
    let questionsCount = await Question.query().select(
      Database.raw("COUNT(*) as count")
    );
    let usersCount = await User.query().select(
      Database.raw("COUNT(*) as count")
    );

    // Charts Quizzes Data
    let quizzesCountByMonthsAdmin = await Quiz.query().withScopes((scopes) =>
      scopes.groupByMonths(user?.id)
    );
    let quizzesCountByMonthsNotAdmin = await Quiz.query().withScopes((scopes) =>
      scopes.groupByMonths(user?.id, false)
    );

    let months = await Quiz.query().withScopes((scopes) =>
      scopes.groupBy("created_at")
    );
    let monthsString = months.map((quiz) =>
      quiz.createdAt.toFormat("MMM")
    ) as string[];
    monthsString = [...new Set(monthsString)];
    let chartQuizMonthUsers = this.quizCreateUsers.createData(
      quizzesCountByMonthsAdmin,
      quizzesCountByMonthsNotAdmin,
      monthsString
    );

    // Charts quizzes by category Data
    let quizzesCountByCategoryAdmin = await Quiz.query().withScopes(
      (scopes) => {
        scopes.groupByCategories(user?.id);
      }
    );
    let quizzesCountByCategoryNotAdmin = await Quiz.query().withScopes(
      (scopes) => {
        scopes.groupByCategories(user?.id, false);
      }
    );
    let categoriesGrouped = await Category.query().withScopes((scopes) => {
      scopes.groupBy("name");
    });
    let chartQuizByCategoryUsers = this.quizByCategory.createData(
      quizzesCountByCategoryAdmin,
      quizzesCountByCategoryNotAdmin,
      categoriesGrouped
    );

    return view.render("dashboard/index", {
      quizzes,
      categories,
      quizzesCount,
      categoriesCount,
      usersCount,
      questionsCount,
      chartQuizMonthUsers: JSON.stringify(chartQuizMonthUsers),
      chartQuizByCategoryUsers: JSON.stringify(chartQuizByCategoryUsers)
    });
  }
}
