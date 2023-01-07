import Quiz from "../../Models/Quiz";
import Category from "../../Models/Category";

export default class QuizByCategoryPercentage {
  public creatData(
    quizzes: Quiz[],
    quizCount: Quiz | null,
    categories: Category[]
  ) {
    let data = {};
    let categoryLabels = [] as string[];

    categories.forEach((category) => {
      data[category.name] = 0;
      categoryLabels.push(category.name);
    });

    quizzes.forEach((quiz) => {
      data[quiz.category.name] =
        (quiz.$extras.count / quizCount?.$extras.count) * 100;
    });

    data = Object.values(data);

    return {
      data,
      categoryLabels
    };
  }
}
