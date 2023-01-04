import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import User from "./User";
import Quiz from "./Quiz";

export default class QuizzesSessions extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public start: boolean;

  @column()
  public end: boolean;

  @column()
  public score: number;

  @column()
  public quiz_id: number;

  @column()
  public user_id: number;

  @belongsTo(() => User, {
    foreignKey: "user_id"
  })
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Quiz, {
    foreignKey: "quiz_id"
  })
  public quiz: BelongsTo<typeof Quiz>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
