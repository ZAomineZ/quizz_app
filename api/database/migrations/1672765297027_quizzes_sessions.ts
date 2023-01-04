import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "quizzes_sessions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.boolean("start").defaultTo(false);
      table.boolean("end").defaultTo(false);
      table.integer("score").nullable();
      table.integer("quiz_id").unsigned().index();
      table.integer("user_id").unsigned().index();
      table
        .foreign("quiz_id")
        .references("id")
        .inTable("quizzes")
        .onDelete("cascade");
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
