import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KategoriValidator from 'App/Validators/KategoriValidator'

export default class KategorisController {
  public async store({ request, response }: HttpContextContract) {
        try {
        const payload = await request.validate(KategoriValidator)

        response.status(201).json({
            status: 'success',
            data: payload,
        })
        } catch (error) {
            response.status(422).json({
                status: 'error',
                message: 'Validation failed',
                errors: error.messages,
            })
        }
    }
}
