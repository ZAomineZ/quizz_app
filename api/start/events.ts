/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from "@ioc:Adonis/Core/Event";

Event.on("notification:quiz_submitted", "QuizSubmitted.onAddNotification");
Event.on(
  "notification:quiz_question_submitted",
  "QuizQuestionSubmitted.onAddNotification"
);
