import { BaseTask } from "adonis5-scheduler/build";
import Quiz from "../Models/Quiz";
import Category from "../Models/Category";
import User from "../Models/User";
import QuizCreateUsers from "../Services/Chart/QuizCreateUsers";
import QuizByCategory from "../Services/Chart/QuizByCategory";
import QuizByMonthsPercentage from "../Services/Chart/QuizByMonthsPercentage";
import QuizByCategoryPercentage from "../Services/Chart/QuizByCategoryPercentage";
import Database from "@ioc:Adonis/Lucid/Database";
import Statistic from "../Models/Statistic";
import QuizByMonths from "../Services/Chart/QuizByMonths";

export default class StatisticDashboard extends BaseTask {
  public static get schedule() {
    return "*/1 * * * *";
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return true;
  }

  public async handle() {
    let user = await User.query().where("username", "=", "Admin").first();

    if (null === user) return;

    let userID = user?.id as number;

    const quizCreateUsers = new QuizCreateUsers();
    const quizByCategory = new QuizByCategory();
    const quizByMonths = new QuizByMonths();
    const quizByMonthsPercentage = new QuizByMonthsPercentage();
    const quizByCategoryPercentage = new QuizByCategoryPercentage();

    let quizzesCount = await Quiz.query()
      .select(Database.raw("COUNT(*) as count"))
      .first();

    // Charts Quizzes Data
    let quizzesCountByMonthsAdmin = await Quiz.query().withScopes((scopes) =>
      scopes.groupByMonths(userID)
    );
    let quizzesCountByMonthsNotAdmin = await Quiz.query().withScopes((scopes) =>
      scopes.groupByMonths(userID, false)
    );

    let months = await Quiz.query().withScopes((scopes) =>
      scopes.groupBy("created_at")
    );
    let monthsString = months.map((quiz) =>
      quiz.createdAt.toFormat("MMM")
    ) as string[];
    monthsString = [...new Set(monthsString)];
    let chartQuizMonthUsers = quizCreateUsers.createData(
      quizzesCountByMonthsAdmin,
      quizzesCountByMonthsNotAdmin,
      monthsString
    );

    // Charts quizzes by category Data
    let quizzesCountByCategoryAdmin = await Quiz.query().withScopes(
      (scopes) => {
        scopes.groupByCategories(userID);
      }
    );
    let quizzesCountByCategoryNotAdmin = await Quiz.query().withScopes(
      (scopes) => {
        scopes.groupByCategories(userID, false);
      }
    );
    let categoriesGrouped = await Category.query().withScopes((scopes) => {
      scopes.groupBy("name");
    });
    let chartQuizByCategoryUsers = quizByCategory.createData(
      quizzesCountByCategoryAdmin,
      quizzesCountByCategoryNotAdmin,
      categoriesGrouped
    );

    // Chart quizzes percentage by month
    let quizzesCountByMonths = await Quiz.query().withScopes((scopes) => {
      scopes.groupMyMonthsWithoutConditionUser();
    });
    let chartQuizByMonthsPercentage = quizByMonthsPercentage.createData(
      quizzesCountByMonths,
      quizzesCount,
      monthsString
    );

    // Chart count Quizzes
    let chartQuizByMonths = quizByMonths.createData(
      quizzesCountByMonths,
      monthsString
    );

    // Chart quizzes percentage by category
    let quizzesCountByCategory = await Quiz.query().withScopes((scopes) => {
      scopes.groupByCategoriesWithoutConditionUser();
    });
    let chartQuizByCategoryPercentage = quizByCategoryPercentage.creatData(
      quizzesCountByCategory,
      quizzesCount,
      categoriesGrouped
    );

    // Add or Update statistics
    let statistics = await Statistic.query()
      .where("user_id", "=", userID)
      .first();
    let values = {
      chart_quiz_month_users: JSON.stringify(chartQuizMonthUsers),
      chart_quiz_by_category_users: JSON.stringify(chartQuizByCategoryUsers),
      chart_quiz_by_months_percentage: JSON.stringify(
        chartQuizByMonthsPercentage
      ),
      chart_quiz_by_months: JSON.stringify(chartQuizByMonths),
      chart_quiz_by_category_percentage: JSON.stringify(
        chartQuizByCategoryPercentage
      ),
      user_id: userID
    };
    if (!statistics) {
      await Statistic.create(values);
    } else {
      await statistics.merge(values);
      await statistics.save();
    }
  }
}
