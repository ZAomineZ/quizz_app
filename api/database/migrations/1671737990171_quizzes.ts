import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { QuizDifficulty } from "../../app/enums/Quiz";

export default class extends BaseSchema {
  protected tableName = "quizzes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title", 255).notNullable().unique();
      table.string("slug", 255).notNullable().unique();
      table.text("description").notNullable();
      table.enum("difficulty", Object.values(QuizDifficulty));
      table.integer("category_id").unsigned().index();
      table
        .foreign("category_id")
        .references("id")
        .inTable("categories")
        .onDelete("cascade");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
