import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { UserRole } from "../../app/enums/UserRole";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("role_id").defaultTo(UserRole.USER).unsigned().index();
      table
        .foreign("role_id")
        .references("id")
        .inTable("roles")
        .onDelete("cascade");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("role_id");
    });
  }
}
