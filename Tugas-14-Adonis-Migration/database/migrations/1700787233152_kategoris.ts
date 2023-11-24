import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'kategoris'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nama', 45).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
