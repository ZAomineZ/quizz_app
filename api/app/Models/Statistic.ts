import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import User from "./User";

export default class Statistic extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public chart_quiz_month_public: string;

  @column()
  public chart_quiz_category_public: string;

  @column()
  public chart_quiz_month_users: string;

  @column()
  public chart_quiz_by_category_users: string;

  @column()
  public chart_quiz_by_months: string;

  @column()
  public chart_quiz_by_months_percentage: string;

  @column()
  public chart_quiz_by_category_percentage: string;

  @column()
  public user_id: number;

  @belongsTo(() => User, {
    foreignKey: "user_id"
  })
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
