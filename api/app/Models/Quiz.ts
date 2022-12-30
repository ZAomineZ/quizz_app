import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany
} from "@ioc:Adonis/Lucid/Orm";
import { QuizDifficulty } from "../enums/Quiz";
import Category from "./Category";
import { DateTime } from "luxon";
import { Question } from "./Question";
import { hasMany } from "@adonisjs/lucid/build/src/Orm/Decorators";
import User from "./User";

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
  public user_id: number;

  @column()
  public image: string;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasMany(() => Question, {
    foreignKey: "quiz_id"
  })
  public questions: HasMany<typeof Question>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  public nameImage(): string {
    let image = this.image;
    let imageParts = image.split("/");

    return imageParts[imageParts.length - 1] ?? "";
  }
}
