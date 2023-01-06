import type { EventsList } from "@ioc:Adonis/Core/Event";
import { Update } from "@ioc:Setten/Mercure";
import User from "../Models/User";
import Notification from "../Models/Notification";

export default class QuizQuestionSubmitted {
  public async onAddNotification({
    quiz,
    question
  }: EventsList["notification:quiz_question_submitted"]) {
    // Send on topic notifications
    const message = `New question "${question.question} on the quiz '${quiz.title}'"`;
    await Update.send("/notifications", { message });
    // Create notification model
    let user = await User.query().where("username", "=", "Admin").first();
    await Notification.create({
      message,
      type: "New question on quiz",
      to_id: user?.id,
      from_id: quiz?.user_id
    });
  }
}
