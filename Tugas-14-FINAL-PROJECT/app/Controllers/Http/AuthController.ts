import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Mail from '@ioc:Adonis/Addons/Mail'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import RegisterValidator from 'App/Validators/RegisterValidator'
import LoginValidator from 'App/Validators/LoginValidator'
import ProfileValidator from 'App/Validators/ProfileValidator'
import User from 'App/Models/User'

export default class AuthController {
    public async register({ request, response}: HttpContextContract) {
        try {
            const payload = await request.validate(RegisterValidator)

            // Add user
            const user = await User.create(payload)
            // Generate OTP code
            const otp_code = Math.floor(100000 + Math.random() * 900000)
            // Send email
            await Mail.send((message) => {
                message
                    .from('admin@perpusapi.com')
                    .to(payload.email)
                    .subject('Welcome Onboard!')
                    .htmlView('emails/otp_verification', { otp_code })
            })

            // Saving OTP code to db
            await Database.table('otp_codes').insert({otp_code: otp_code, user_id: user.id})

            response.status(201).json({
                status: 'success',
                message: 'Success registered account',
                data: user
            })

        } catch (error) {
            console.log(error);
            
            if (error.code === 'E_VALIDATION_FAILURE') {
                return response.status(400).json({
                  status: 'error',
                  message: 'Error validating data'
                })
            } else {
                return response.status(500).json({
                    status: 'error',
                    message: error.messages
                })
            }
        }
    }

    public async login({ request, response, auth }: HttpContextContract) {
        const { email, password } = await request.validate(LoginValidator)

        try {
            const token = await auth.use('api').attempt(email, password, { expiresIn: '7 days' })
            
            response.status(200).json({
                status: 'success',
                message: 'Login success',
                data: token
            })

        } catch (error) {
            return response.unauthorized({
                message: 'Invalid email or password. Please check your credentials and try again.'
            })
        }
    }

    public async me({ response, auth }: HttpContextContract) {
        try {
            // Retrieve authenticated user data
            const userData = auth.user

            return response.status(200).json({
                status: 'success',
                data: userData
            })
        } catch (error) {
            return response.status(500).json({
                status: 'error',
                message: error.messages
            })
        }
    }

    public async otpConfirm({ response, request }) {
        try {
            const { email, otp } = await request.validate({
                schema: schema.create({ 
                    email: schema.string({}, [rules.email()]), 
                    otp: schema.number()})
            }) 

            let user = await User.findBy('email', email)
            let otpCheck = await Database.query().from('otp_codes').where('otp_code', otp).first()

            if (user && user?.id == otpCheck.user_id) {
                user.is_verified = true
                await user?.save()
                return response.status(200).json({
                    status: 'success',
                    message: 'OTP confirmed! Your email is verified'
                })
            } else {
                return response.status(400).json({
                    status: 'bad request',
                    message: 'Failed confirmed OTP'
                })
            }

        } catch (error) {
            console.log(error);
            
            return response.status(500).json({
                status: 'error',
                message: error.messages
            })
        }
    }

    public async updateProfile({ response, request, auth}: HttpContextContract) {
        try {
            // Retrieve authenticated user data
            const userData = auth.user
            const payload = await request.validate(ProfileValidator)
            // Update profile
            await userData?.related('profile').updateOrCreate({},payload)
                
            return response.status(200).json({
                status: 'success',
                message: 'Update success',
                data: userData
            })
        } catch (error) {
            return response.status(500).json({
                status: 'error',
                message: error.messages
            })
        }
    }
}
