import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class KategoriValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nama: schema.string({ trim: true }, [rules.required()])
  })

  public messages: CustomMessages = {
    
  }
}
