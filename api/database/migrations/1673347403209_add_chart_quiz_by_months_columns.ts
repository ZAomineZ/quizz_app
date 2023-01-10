import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "statistics";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("chart_quiz_by_months").nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("chart_quiz_by_months");
    });
  }
}
