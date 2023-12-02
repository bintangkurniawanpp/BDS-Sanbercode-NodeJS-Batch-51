import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BukuValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      judul: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
      ringkasan: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
      tahun_terbit: schema.string.optional({ trim: true }, [rules.maxLength(45)]),
      halaman: schema.number.optional([rules.unsigned()]),
      kategori_id: schema.number.optional([rules.unsigned()]),
  })

  public messages: CustomMessages = {}
}
