import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Quiz from "./Quiz";
import { DateTime } from "luxon";

export class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public question: string;

  @column()
  public good_answer: string;

  @column()
  public bad_answer_1: string;

  @column()
  public bad_answer_2: string;

  @column()
  public bad_answer_3: string;

  @column()
  public quiz_id: number;

  @belongsTo(() => Quiz, {
    foreignKey: "quiz_id"
  })
  public quiz: BelongsTo<typeof Quiz>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
