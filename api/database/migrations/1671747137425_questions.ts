import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "questions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("question", 255).notNullable();
      table.string("good_answer").notNullable();
      table.string("bad_answer_1").notNullable();
      table.string("bad_answer_2").notNullable();
      table.string("bad_answer_3").notNullable();
      table.integer("quiz_id").unsigned().index();
      table
        .foreign("quiz_id")
        .references("id")
        .inTable("quizzes")
        .onDelete("cascade");
      // Timestamp
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
