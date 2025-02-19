import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("email", 255).notNullable().unique();
      table.string("username", 255).notNullable().unique();
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
      table.string("password", 180).notNullable();
      table.string("remember_me_token").nullable();

      /**
       * Uses timestampz for PostgresSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
