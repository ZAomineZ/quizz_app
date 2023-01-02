import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Category from "./Category";

export default class ViewsCategory extends BaseModel {
  public static table = "views_category";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public ip: string;

  @column()
  public category_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;
}
