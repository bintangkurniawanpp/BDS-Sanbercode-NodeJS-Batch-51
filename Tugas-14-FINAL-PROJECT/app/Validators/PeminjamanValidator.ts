import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PeminjamanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tanggal_pinjam: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),
    tanggal_kembali: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss',
    })
  })

  public messages: CustomMessages = {}
}
