import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { QuizState } from "../../app/enums/QuizState";

export default class extends BaseSchema {
  protected tableName = "quizzes";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean("is_public").defaultTo(QuizState.IS_PRIVATE);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("is_public");
    });
  }
}
