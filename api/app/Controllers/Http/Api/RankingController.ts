import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import QuizzesSessions from "../../../Models/QuizzesSessions";
import Database from "@ioc:Adonis/Lucid/Database";
import Quiz from "../../../Models/Quiz";

export default class RankingController {
  public async scores({ response, request }: HttpContextContract) {
    const qs = request.qs();
    let page = qs?.page ?? 1;
    let limit = qs?.limit ?? 10;

    let quizSessions = await QuizzesSessions.query()
      .select("id", "user_id")
      .sum("score as scoreTotal")
      .preload("user", (builder) => {
        builder.select("username");
      })
      .orderBy("scoreTotal", "desc")
      .groupBy("id")
      .paginate(page, limit);

    let quizSessionsSerialize = quizSessions.serialize(this.serialize());

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
      .preload("user", (builder) => {
        builder.select("username");
      })
      .groupBy("user_id")
      .paginate(page, limit);

    let quizSessionsSerialize = quizSessions.serialize(this.serialize());

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
      .paginate(page, limit);

    let quizzesSerialize = quizzes.serialize(this.serialize());

    return response.json({
      success: true,
      rankings: quizzesSerialize
    });
  }

  private serialize() {
    return {
      fields: {
        pick: []
      },
      relations: {
        user: {
          fields: ["username", "id"]
        }
      }
    };
  }
}
