import Quiz from "../../Models/Quiz";

export default class QuizByMonthsPercentage {
  public createData(quizzes: Quiz[], quizCount: Quiz | null, months: string[]) {
    let quizPercentageData = [] as number[];

    quizzes.forEach((quiz) => {
      quizPercentageData.push(
        (quiz.$extras.count / quizCount?.$extras.count) * 100
      );
    });

    return {
      quizPercentageData,
      months
    };
  }
}
