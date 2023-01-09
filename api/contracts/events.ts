/**
 * Contract source: https://git.io/JfefG
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

declare module "@ioc:Adonis/Core/Event" {
  /*
  |--------------------------------------------------------------------------
  | Define typed events
  |--------------------------------------------------------------------------
  |
  | You can define types for events inside the following interface and
  | AdonisJS will make sure that all listeners and emit calls adheres
  | to the defined types.
  |
  | For example:
  |
  | interface EventsList {
  |   'new:user': UserModel
  | }
  |
  | Now calling `Event.emit('new:user')` will statically ensure that passed value is
  | an instance of the the UserModel only.
  |
  */
  // @ts-ignore
  import Quiz from "../app/Models/Quiz";
  // @ts-ignore
  import { Question } from "../app/Models/Question";

  interface EventsList {
    "notification:quiz_submitted": { quiz: Quiz };
    "notification:quiz_question_submitted": {
      quiz: Quiz;
      question: Question;
    };
  }
}
