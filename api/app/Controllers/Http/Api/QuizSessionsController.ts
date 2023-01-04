import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Quiz from "../../../Models/Quiz";
import QuizzesSessions from "../../../Models/QuizzesSessions";

export default class QuizSessionsController {
  public async startQuiz({ params, response, auth }: HttpContextContract) {
    let user = auth?.user;
    let quizSlug = params?.quizSlug;

    let quiz = await Quiz.query().where("slug", "=", quizSlug).first();

    if (!quiz) {
      return response.json({
        success: false,
        message: "You can't started a quiz don't exist !"
      });
    }

    // Create session or update session if exist
    let quizSession = await QuizzesSessions.query()
      .where("user_id", "=", user?.id)
      .where("quiz_id", "=", quiz?.id)
      .first();
    if (!quizSession) {
      await QuizzesSessions.create({
        start: true,
        end: false,
        score: 0,
        user_id: user?.id,
        quiz_id: quiz?.id
      });
    } else {
      await quizSession.merge({
        start: true,
        end: false,
        score: 0
      });
      await quizSession?.save();
    }

    return response.json({
      success: true
    });
  }

  public async startQuizChecked({
    params,
    response,
    auth
  }: HttpContextContract) {
    let user = auth?.user;
    let quizSlug = params?.quizSlug;

    let quiz = await Quiz.query().where("slug", "=", quizSlug).first();

    if (!quiz) {
      return response.json({
        success: false,
        message: "You can't started a quiz don't exist !"
      });
    }

    let quizSession = await QuizzesSessions.query()
      .where("user_id", "=", user?.id)
      .where("quiz_id", "=", quiz?.id)
      .first();

    if (!quizSession?.start) {
      return response.json({
        success: false,
        message: "You can't authorized to this page !"
      });
    }

    return response.json({ success: true });
  }

  public async answerSuccess({ params, response, auth }: HttpContextContract) {
    let user = auth?.user;
    let quizSlug = params?.quizSlug;

    let quiz = await Quiz.query().where("slug", "=", quizSlug).first();

    if (!quiz) {
      return response.json({
        success: false,
        message: "You can't confirmed answer on a quiz don't exist !"
      });
    }

    let quizSession = await QuizzesSessions.query()
      .where("user_id", "=", user?.id)
      .where("quiz_id", "=", quiz?.id)
      .first();
    await quizSession?.merge({
      score: quizSession.score + 1
    });
    await quizSession?.save();

    return response.json({
      success: true
    });
  }

  public async endQuiz({ params, response, auth }: HttpContextContract) {
    let user = auth?.user;
    let quizSlug = params?.quizSlug;

    let quiz = await Quiz.query().where("slug", "=", quizSlug).first();

    if (!quiz) {
      return response.json({
        success: false,
        message: "You can't ended a quiz don't exist !"
      });
    }

    // Update session quiz
    let quizSession = await QuizzesSessions.query()
      .where("user_id", "=", user?.id)
      .where("quiz_id", "=", quiz?.id)
      .first();
    await quizSession?.merge({
      start: false,
      end: true
    });
    await quizSession?.save();

    return response.json({
      success: true
    });
  }

  public async endQuizChecked({ params, response, auth }: HttpContextContract) {
    let user = auth?.user;
    let quizSlug = params?.quizSlug;

    let quiz = await Quiz.query()
      .select("id", "title")
      .withCount("questions")
      .where("slug", "=", quizSlug)
      .first();

    if (!quiz) {
      return response.json({
        success: false,
        message: "You can't ended a quiz don't exist !"
      });
    }

    let quizSession = await QuizzesSessions.query()
      .select("score", "end")
      .where("user_id", "=", user?.id)
      .where("quiz_id", "=", quiz?.id)
      .first();

    if (!quizSession?.end) {
      return response.json({
        success: false,
        message: "You can't authorized to this page !"
      });
    }

    let quizJSON = {
      ...quiz.toJSON(),
      questions_count: quiz.$extras.questions_count
    };

    return response.json({ success: true, quizSession, quiz: quizJSON });
  }
}
