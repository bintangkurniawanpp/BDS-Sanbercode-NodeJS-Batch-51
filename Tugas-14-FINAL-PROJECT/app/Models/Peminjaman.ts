import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Buku from './Buku'

export default class Peminjaman extends BaseModel {
  public static table = 'peminjaman'

  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public buku_id: number

  @column.date({ autoCreate: true })
  public tanggal_pinjam: DateTime

  @column.date({ autoCreate: true })
  public tanggal_kembali: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Buku, {
    foreignKey: 'buku_id',
  })
  public buku: BelongsTo<typeof Buku>
}
