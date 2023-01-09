import type { EventsList } from "@ioc:Adonis/Core/Event";
import { Update } from "@ioc:Setten/Mercure";
import Notification from "../Models/Notification";
import User from "../Models/User";

export default class QuizSubmitted {
  public async onAddNotification({
    quiz
  }: EventsList["notification:quiz_submitted"]) {
    // Send on topic notifications
    const message = `New quiz proposed with the name '${quiz.title}' !`;

    let user = await User.query().where("username", "=", "Admin").first();

    await Update.send(`/notifications/${user?.id}`, {
      message,
      imageUser: user?.image as string
    });
    // Create notification model
    await Notification.create({
      message,
      type: "New proposition quiz",
      to_id: user?.id,
      from_id: quiz?.user_id
    });
  }
}
