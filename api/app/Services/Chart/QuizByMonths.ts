import Quiz from "../../Models/Quiz";

export default class QuizByMonths {
  public createData(quizzes: Quiz[], months: string[]) {
    let quizData = [] as number[];

    quizzes.forEach((quiz) => {
      quizData.push(quiz.$extras.count);
    });

    return {
      quizData,
      months
    };
  }
}
