import Quiz from "../../Models/Quiz";
import Category from "../../Models/Category";

export default class QuizByCategory {
  public createData(
    quizzesByCategoryAdmin: Quiz[],
    quizzesByCategoryUsers: Quiz[],
    categories: Category[]
  ) {
    let adminData = {};
    let usersData = {};
    let categoryLabels = [] as string[];

    categories.forEach((category) => {
      adminData[category.name] = 0;
      usersData[category.name] = 0;
      categoryLabels.push(category.name);
    });

    quizzesByCategoryAdmin.forEach((quiz) => {
      adminData[quiz.category.name] = quiz.$extras.count;
    });
    quizzesByCategoryUsers.forEach((quiz) => {
      usersData[quiz.category.name] = quiz.$extras.count;
    });

    adminData = Object.values(adminData);
    usersData = Object.values(usersData);

    return {
      adminData,
      usersData,
      categoryLabels
    };
  }
}
