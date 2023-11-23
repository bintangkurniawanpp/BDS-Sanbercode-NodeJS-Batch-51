import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BukuValidator from 'App/Validators/BukuValidator'

export default class BukusController {
    public async store({ request, response }: HttpContextContract) {
        try {
          const payload = await request.validate(BukuValidator)
    
          return response.status(201).json({
            status: 'success',
            data: payload,
          })
        } catch (error) {
          return response.status(422).json({
            status: 'error',
            message: 'Validation failed',
            errors: error.validated,
          })
        }
      }
}
