import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import QuizzesSessions from "../../../Models/QuizzesSessions";
import Database from "@ioc:Adonis/Lucid/Database";
import Quiz from "../../../Models/Quiz";
import { QuizState } from "../../../enums/QuizState";
import { serializeRanking } from "../../../Serializer/RankingSerialize";

export default class RankingController {
  public async scores({ response, request }: HttpContextContract) {
    const qs = request.qs();
    let page = qs?.page ?? 1;
    let limit = qs?.limit ?? 10;

    let quizSessions = await QuizzesSessions.query()
      .select("id", "user_id")
      .where("score", ">", 0)
      .sum("score as scoreTotal")
      .preload("user", (builder) => {
        builder.select("username");
      })
      .orderBy("scoreTotal", "desc")
      .groupBy("id")
      .paginate(page, limit);

    let quizSessionsSerialize = quizSessions.serialize(serializeRanking);

    return response.json({
      success: true,
      rankings: quizSessionsSerialize
    });
  }

  public async participations({ response, request }: HttpContextContract) {
    const qs = request.qs();
    let page = qs?.page ?? 1;
    let limit = qs?.limit ?? 10;

    let quizSessions = await QuizzesSessions.query()
      .select(
        Database.raw("COUNT(DISTINCT user_id) as count_participations"),
        "user_id"
      )
      .where("score", ">", 0)
      .preload("user", (builder) => {
        builder.select("username");
      })
      .groupBy("user_id")
      .paginate(page, limit);

    let quizSessionsSerialize = quizSessions.serialize(serializeRanking);

    return response.json({
      success: true,
      rankings: quizSessionsSerialize
    });
  }

  public async publications({ response, request }: HttpContextContract) {
    const qs = request.qs();
    let page = qs?.page ?? 1;
    let limit = qs?.limit ?? 10;

    let quizzes = await Quiz.query()
      .select(
        Database.raw("COUNT(DISTINCT user_id) as count_publications"),
        "user_id"
      )
      .preload("user", (builder) => {
        builder.select("username");
      })
      .groupBy("user_id")
      .where("is_public", "=", QuizState.IS_PUBLIC)
      .paginate(page, limit);

    let quizzesSerialize = quizzes.serialize(serializeRanking);

    return response.json({
      success: true,
      rankings: quizzesSerialize
    });
  }
}
