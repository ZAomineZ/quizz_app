import {
  belongsTo,
  BelongsTo,
  column,
  BaseModel,
  HasMany
} from "@ioc:Adonis/Lucid/Orm";
import { QuizDifficulty } from "../enums/Quiz";
import Category from "./Category";
import { DateTime } from "luxon";
import { Question } from "./Question";
import { hasMany } from "@adonisjs/lucid/build/src/Orm/Decorators";

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

  @column()
  public image: string;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @hasMany(() => Question, {
    foreignKey: "quiz_id"
  })
  public questions: HasMany<typeof Question>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
