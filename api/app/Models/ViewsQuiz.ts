import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Quiz from "./Quiz";
import { DateTime } from "luxon";

export default class ViewsQuiz extends BaseModel {
  public static table = "views_quiz";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public ip: string;

  @column()
  public quiz_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Quiz)
  public quiz: BelongsTo<typeof Quiz>;
}
