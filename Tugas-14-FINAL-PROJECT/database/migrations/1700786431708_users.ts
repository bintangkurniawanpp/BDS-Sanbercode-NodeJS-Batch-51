import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nama', 45).notNullable()
      table.string('email', 45).unique().notNullable()
      table.string('password', 180).notNullable()
      table.enum('role', ['user', 'admin']).notNullable()
      table.boolean('is_verified').defaultTo(false)
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
