import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { UserRole } from "../../app/enums/UserRole";

export default class extends BaseSchema {
  protected tableName = "roles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name", 50).notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { id: UserRole.USER, name: "User" },
        { id: UserRole.ADMIN, name: "Admin" }
      ]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
