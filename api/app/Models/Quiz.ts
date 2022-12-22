import { belongsTo, BelongsTo, column, BaseModel } from "@ioc:Adonis/Lucid/Orm";
import { QuizDifficulty } from "../enums/Quiz";
import Category from "./Category";
import { DateTime } from "luxon";

export default class Quiz extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public slug: string;

  @column()
  public description: string;

  @column()
  public difficulty: QuizDifficulty;

  @column()
  public categoryId: number;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
