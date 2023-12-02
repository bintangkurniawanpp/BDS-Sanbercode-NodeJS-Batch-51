import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })]),
    nama: schema.string({}, [rules.unique({ table: 'users', column: 'nama'})]),
    password: schema.string(),
    role: schema.enum(['user', 'admin'] as const)
})


  public messages: CustomMessages = {}
}
