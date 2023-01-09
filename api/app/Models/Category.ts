import { DateTime } from "luxon";
import { column, BaseModel, HasMany, scope } from "@ioc:Adonis/Lucid/Orm";
import ViewsCategory from "./ViewsCategory";
import { hasMany } from "@adonisjs/lucid/build/src/Orm/Decorators";
import Quiz from "./Quiz";

export default class Category extends BaseModel {
  /**
   * Serialize the `$extras` object as it is
   */
  public serializeExtras = true;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public slug: string;

  @column()
  public description: string;

  @column()
  public image: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Quiz, {
    foreignKey: "category_id"
  })
  public quizzes: HasMany<typeof Quiz>;

  @hasMany(() => ViewsCategory, {
    foreignKey: "category_id"
  })
  public viewsCategory: HasMany<typeof ViewsCategory>;

  public nameImage(): string {
    let image = this.image;
    let imageParts = image?.split("/") ?? [];

    return imageParts[imageParts.length - 1] ?? "";
  }

  public static groupBy = scope((query, field: string) => {
    query.distinct(field).groupBy(field);
  });
}
