import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import { DateTime } from "luxon";

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public message: string;

  @column()
  public type: string;

  @column()
  public read: boolean = false;

  @column()
  public from_id: number;

  @column()
  public to_id: number;

  @belongsTo(() => User, {
    foreignKey: "from_id"
  })
  public fromUser: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    foreignKey: "to_id"
  })
  public toUser: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
