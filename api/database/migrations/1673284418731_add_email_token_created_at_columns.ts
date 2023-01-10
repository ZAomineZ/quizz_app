import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp("email_token_created_at", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("email_token_created_at");
    });
  }
}
