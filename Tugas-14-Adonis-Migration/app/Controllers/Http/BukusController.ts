import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import BukuValidator from 'App/Validators/BukuValidator'

export default class BukusController {
    public async index({ response }: HttpContextContract) {
        try {
            const bukuData = await Database.from('bukus').select('*')
            response.json({
                status: 'success retrieving bukus data',
                data: bukuData,
            })
        } catch (error) {
            console.error('Error fetching bukus:', error)

            return response.status(500).json({
                status: 'Error fetching bukus',
                message: 'Internal server error',
            })
        }
    }

    public async store({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(BukuValidator)
            const bukuData = await Database
                .table('bukus')
                .insert(payload)

            response.status(201).json({
                status: 'success inserting buku',
                data: bukuData,
            })
        } catch (error) {
            if (error.code === 'E_VALIDATION_FAILURE') {
                return response.status(400).json({
                    status: 'error validating buku data',
                    errors: error.messages,
                })
            } else {
                return response.status(500).json({
                    status: 'error inserting buku',
                    message: 'Internal server error',
                })
            }
        }
    }

    public async show({ request, response }: HttpContextContract) {
        const bukuId = request.param('id')
        try {
            const bukuData = await Database.from('bukus').where('id', bukuId).first()

            if (!bukuData) {
                return response.status(404).json({
                    status: 'error',
                    message: 'Buku not found',
                })
            }
            response.json({
                status: 'success retrieving buku',
                data: bukuData,
            })
        } catch (error) {
            console.error('Error fetching buku:', error)

            return response.status(500).json({
                status: 'error',
                message: 'Internal server error',
            })
        }
    }

    public async update({ request, response }: HttpContextContract) {
        const bukuId = request.param('id')
        try {
            const payload = await request.validate(BukuValidator)

            const updatedRows = await Database
                .from('bukus')
                .where('id', bukuId)
                .update(payload)

            response.json({
                status: 'success updated',
                data: updatedRows,
            })
        } catch (error) {
            return response.status(500).json({
                status: 'error',
                message: 'Internal server error',
            })
        }
    }

    public async destroy({ request, response }: HttpContextContract) {
        const bukuId = request.param('id')

        try {
            await Database.from('bukus')
                .where('id', bukuId)
                .delete()

            return response.json({
                status: 'success',
                message: 'Buku deleted successfully',
            })
        } catch (error) {
            console.error('Error deleting buku:', error)

            return response.status(500).json({
                status: 'error',
                message: 'Internal server error',
            })
        }
    }
}
