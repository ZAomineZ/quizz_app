import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  BelongsTo,
  belongsTo,
  computed,
  HasMany,
  hasMany,
  HasOne,
  hasOne
} from "@ioc:Adonis/Lucid/Orm";
import Role from "./Role";
import { UserRole } from "../enums/UserRole";
import Quiz from "./Quiz";
import Statistic from "./Statistic";

export default class User extends BaseModel {
  /**
   * Serialize the `$extras` object as it is
   */
  public serializeExtras = true;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public email: string;

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken: string | null;

  @column()
  public image: string | null;

  @column()
  public role_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>;

  @hasMany(() => Quiz, {
    foreignKey: "user_id"
  })
  public quizzes: HasMany<typeof Quiz>;

  @hasOne(() => Statistic, {
    foreignKey: "user_id"
  })
  public statistic: HasOne<typeof Statistic>;

  @computed()
  public get isAdmin() {
    return this.role_id === UserRole.ADMIN;
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  public nameImage(): string {
    let image = this.image;
    let imageParts = image?.split("/") ?? [];

    return imageParts[imageParts.length - 1] ?? "";
  }
}
