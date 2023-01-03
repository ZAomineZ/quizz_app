import { DateTime } from "luxon";
import { column, BaseModel, HasMany } from "@ioc:Adonis/Lucid/Orm";
import ViewsCategory from "./ViewsCategory";
import { hasMany } from "@adonisjs/lucid/build/src/Orm/Decorators";
import ViewsQuiz from "./ViewsQuiz";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public slug: string;

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => ViewsCategory, {
    foreignKey: "category_id"
  })
  public viewsCategory: HasMany<typeof ViewsCategory>;
}
