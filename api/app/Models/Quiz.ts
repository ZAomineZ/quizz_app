import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  scope
} from "@ioc:Adonis/Lucid/Orm";
import { QuizDifficulty } from "../enums/Quiz";
import Category from "./Category";
import { DateTime } from "luxon";
import { Question } from "./Question";
import { hasMany } from "@adonisjs/lucid/build/src/Orm/Decorators";
import { slugify } from "@ioc:Adonis/Addons/LucidSlugify";
import User from "./User";
import Database from "@ioc:Adonis/Lucid/Database";

export default class Quiz extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  @slugify({
    strategy: "dbIncrement",
    fields: ["title"],
    allowUpdates: true
  })
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

  @column()
  public is_public: boolean;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @belongsTo(() => User, {
    foreignKey: "user_id"
  })
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
    let imageParts = image?.split("/") ?? [];

    return imageParts[imageParts.length - 1] ?? "";
  }

  public static groupBy = scope((query, field: string) => {
    query.distinct(field).groupBy(field);
  });

  public static groupByMonths = scope(
    (query, userID: number, relatedAdmin: boolean = true) => {
      query
        .select(
          Database.raw("COUNT(*) as count"),
          Database.raw("EXTRACT(MONTH FROM created_at) as month")
        )
        .where("user_id", relatedAdmin ? "=" : "!=", userID)
        .groupBy("id", "month");
    }
  );
}
