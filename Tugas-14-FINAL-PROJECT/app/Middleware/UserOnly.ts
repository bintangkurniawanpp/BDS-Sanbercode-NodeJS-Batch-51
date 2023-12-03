import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserOnly {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = auth.user as User 

    if (user && user.role !== 'user') {
      return response.status(403).json({
        status: 'error',
        message: 'Access forbidden. User Only.',
      })
    }

    await next()
  }
}
