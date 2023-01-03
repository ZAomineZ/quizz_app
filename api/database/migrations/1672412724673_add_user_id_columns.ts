import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "quizzes";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("user_id").unsigned().index();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("user_id");
    });
  }
}
