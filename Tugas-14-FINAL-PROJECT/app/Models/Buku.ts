import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Kategori from './Kategori'
import User from './User'

export default class Buku extends BaseModel {
  public static table = 'bukus'

  @column({ isPrimary: true })
  public id: number

  @column()
  public judul: string

  @column()
  public ringkasan: string

  @column()
  public tahun_terbit: string

  @column()
  public halaman: number

  @column()
  public kategori_id: number

  @belongsTo(() => Kategori, {
    foreignKey: 'kategori_id'
  })
  public kategori: BelongsTo<typeof Kategori>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'buku_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'peminjaman'
  })
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
