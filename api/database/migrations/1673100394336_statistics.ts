import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "statistics";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("chart_quiz_month_public").nullable();
      table.string("chart_quiz_category_public").nullable();
      table.string("chart_quiz_month_users").nullable();
      table.string("chart_quiz_by_category_users").nullable();
      table.string("chart_quiz_by_months_percentage").nullable();
      table.string("chart_quiz_by_category_percentage").nullable();
      table.integer("user_id").unsigned().index();
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
