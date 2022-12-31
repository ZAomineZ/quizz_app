import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Question } from "../../../Models/Question";
import QuestionValidator from "../../../Validators/QuestionValidator";
import Quiz from "../../../Models/Quiz";

export default class QuestionsController {
  public async create({ params, response }: HttpContextContract) {
    let quizID = params?.quizID;

    // Create empty question
    let quiz = await Quiz.findOrFail(quizID);
    let question = await Question.create({
      question: "",
      good_answer: "",
      bad_answer_1: "",
      bad_answer_2: "",
      bad_answer_3: "",
      quiz_id: quiz.id
    });

    return response?.status(201).json({
      success: true,
      question
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    let id = params?.id;

    let question = await Question.findOrFail(id);
    if (!question) {
      return response.json({
        success: false,
        message: "This question can't be updated !"
      });
    }

    const payload = await request.validate(QuestionValidator);
    // Update question
    await question.merge(payload);
    await question.save();

    return response.json({
      success: true,
      message: "You are create your question with success !"
    });
  }
}
