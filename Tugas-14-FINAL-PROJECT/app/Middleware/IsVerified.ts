import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class IsVerified {
  public async handle({ auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = auth.user as User | undefined

    if (user && !user.is_verified) {
      return response.status(401).json({
        status: 'error',
        message: 'User is not verified. Please verify your email by confirming the OTP code',
      })
    }

    await next()
  }
}
