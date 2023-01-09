import { BaseTask } from "adonis5-scheduler/build";
import User from "../Models/User";
import { QuizState } from "../enums/QuizState";
import Quiz from "../Models/Quiz";
import Category from "../Models/Category";
import QuizPublic from "../Services/Chart/QuizPublic";
import QuizPublicByCategory from "../Services/Chart/QuizPublicByCategory";
import Statistic from "../Models/Statistic";

export default class StatisticUser extends BaseTask {
  public static get schedule() {
    return "*/10 * * * *";
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return true;
  }

  public async handle() {
    // Find all users has quizzes
    let users = await User.query()
      .select("id")
      .distinct()
      .has("quizzes", ">=", 1);

    const quizPublic = new QuizPublic();
    const quizPublicByCategory = new QuizPublicByCategory();

    for (const user of users) {
      // Charts Quizzes public or not by month Data
      let quizzesCountByMonthsPublic = await Quiz.query()
        .withScopes((scopes) => {
          scopes.groupByMonths(user?.id as number);
        })
        .where("is_public", "=", QuizState.IS_PUBLIC);
      let quizzesCountByMonthsNotPublic = await Quiz.query()
        .withScopes((scopes) => {
          scopes.groupByMonths(user?.id as number);
        })
        .where("is_public", "=", QuizState.IS_PRIVATE);

      let months = await Quiz.query().withScopes((scopes) =>
        scopes.groupBy("created_at")
      );
      let monthsString = months.map((quiz) =>
        quiz.createdAt.toFormat("MMM")
      ) as string[];
      monthsString = [...new Set(monthsString)];
      let chartQuizMonthsPublic = quizPublic.createData(
        quizzesCountByMonthsPublic,
        quizzesCountByMonthsNotPublic,
        monthsString
      );

      // Chart Quizzes public or not by category data
      let quizzesCountByCategoryPublic = await Quiz.query()
        .withScopes((scopes) => {
          scopes.groupByCategories(user?.id as number);
        })
        .where("is_public", "=", QuizState.IS_PUBLIC);
      let quizzesCountByCategoryNoPublic = await Quiz.query()
        .withScopes((scopes) => {
          scopes.groupByCategories(user?.id as number);
        })
        .where("is_public", "=", QuizState.IS_PRIVATE);
      let categoriesGrouped = await Category.query().withScopes((scopes) => {
        scopes.groupBy("name");
      });
      let chartQuizCategoryPublic = quizPublicByCategory.createData(
        quizzesCountByCategoryPublic,
        quizzesCountByCategoryNoPublic,
        categoriesGrouped
      );

      // Add or Update statistics
      let statistics = await Statistic.query()
        .where("user_id", "=", user?.id)
        .first();
      if (!statistics) {
        await Statistic.create({
          chart_quiz_category_public: JSON.stringify(chartQuizCategoryPublic),
          chart_quiz_month_public: JSON.stringify(chartQuizMonthsPublic),
          user_id: user?.id
        });
      } else {
        await statistics.merge({
          chart_quiz_category_public: JSON.stringify(chartQuizCategoryPublic),
          chart_quiz_month_public: JSON.stringify(chartQuizMonthsPublic)
        });
        await statistics.save();
      }
    }
  }
}
