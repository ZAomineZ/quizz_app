import Quiz from "../../Models/Quiz";
import Category from "../../Models/Category";

export default class QuizPublicByCategory {
  public createData(
    quizzesPublic: Quiz[],
    quizzesNoPublic: Quiz[],
    categories: Category[]
  ) {
    let quizzesPublicData = {};
    let quizzesNoPublicData = {};
    let categoryLabels = [] as string[];

    categories.forEach((category) => {
      quizzesPublicData[category.name] = 0;
      quizzesNoPublicData[category.name] = 0;
      categoryLabels.push(category.name);
    });

    quizzesPublic.forEach((quiz) => {
      quizzesPublicData[quiz.category.name] = quiz.$extras.count;
    });
    quizzesNoPublic.forEach((quiz) => {
      quizzesNoPublicData[quiz.category.name] = quiz.$extras.count;
    });

    quizzesPublicData = Object.values(quizzesPublicData);
    quizzesNoPublicData = Object.values(quizzesNoPublicData);

    return {
      quizzesPublicData,
      quizzesNoPublicData,
      categoryLabels
    };
  }
}
