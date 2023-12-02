import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    bio: schema.string.optional({ trim: true }),
    alamat: schema.string.optional({ trim: true }),
  })

  public messages: CustomMessages = {}
}
