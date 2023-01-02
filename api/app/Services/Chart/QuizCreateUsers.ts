import Quiz from "../../Models/Quiz";

export default class QuizCreateUsers {
  public createData(
    quizzesAdmin: Quiz[],
    quizzesUsers: Quiz[],
    months: string[]
  ) {
    let adminData = [] as number[];
    let usersData = [] as number[];

    quizzesAdmin.forEach((quiz) => {
      adminData.push(quiz.$extras.count);
    });
    quizzesUsers.forEach((quiz) => {
      usersData.push(quiz.$extras.count);
    });

    return {
      adminData,
      usersData,
      months
    };
  }
}
