import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'peminjaman'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE')
      table.integer('buku_id').unsigned().notNullable().references('bukus.id').onDelete('CASCADE')
      table.date('tanggal_pinjam').notNullable()
      table.date('tanggal_kembali')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
