import Quiz from "../../Models/Quiz";

export default class QuizPublic {
  public createData(
    quizzesPublic: Quiz[],
    quizzesNoPublic: Quiz[],
    months: string[]
  ) {
    let quizPublicData = [] as number[];
    let quizNoPublicData = [] as number[];

    quizzesPublic.forEach((quiz) => {
      quizPublicData.push(quiz.$extras.count);
    });

    quizzesNoPublic.forEach((quiz) => {
      quizNoPublicData.push(quiz.$extras.count);
    });

    return {
      quizPublicData,
      quizNoPublicData,
      months
    };
  }
}
