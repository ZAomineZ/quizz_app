import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "notifications";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("message", 255);
      table.string("type", 90);
      table.boolean("read").defaultTo(false);
      table.integer("from_id").unsigned().index();
      table.integer("to_id").unsigned().index();
      table
        .foreign("from_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade");
      table
        .foreign("to_id")
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
