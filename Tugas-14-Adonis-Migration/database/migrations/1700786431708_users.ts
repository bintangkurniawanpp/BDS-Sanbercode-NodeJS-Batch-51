import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nama', 255).notNullable()
      table.string('email', 255).unique().notNullable()
      table.string('password', 255).notNullable()
      table.enum('role', ['user', 'admin/owner']).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
