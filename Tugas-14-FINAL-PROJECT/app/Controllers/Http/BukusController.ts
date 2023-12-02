import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BukuValidator from 'App/Validators/BukuValidator'
import Buku from 'App/Models/Buku'
// import Database from '@ioc:Adonis/Lucid/Database'

export default class BukusController {
    public async index({ response }: HttpContextContract) {
        try {
            // Using query builder
            // const bukuData = await Database.from('bukus').select('*')

            // Using ORM
            const bukusData = await Buku.all()
            response.status(200).json({
                status: 'success',
                message: 'Success retrieving bukus data',
                data: bukusData,
            })
        } catch (error) {
            return response.status(500).json({
                status: 'error',
                message: error.message || 'Internal server error',
            })
        }
    }

    public async store({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(BukuValidator)

            // Using query builder
            // const bukuData = await Database
            //     .table('bukus')
            //     .insert(payload)

            // Using ORM
            const bukuData = await Buku.create(payload);

            response.status(201).json({
                status: 'success',
                message: 'Success inserting buku',
                data: bukuData,
            })
        } catch (error) {
            if (error.code === 'E_VALIDATION_FAILURE') {
                return response.status(400).json({
                    status: 'error',
                    message: 'Error validating buku data',
                    errors: error.messages,
                })
            } else {
                return response.status(500).json({
                    status: 'error',
                    message: error.message || 'Internal server error',
                })
            }
        }
    }

    public async show({ request, response }: HttpContextContract) {
        const bukuId = request.param('id')
        try {
            // Using query builder
            // const bukuData = await Database.from('bukus').where('id', bukuId).first()

            // Using ORM
            const bukuData = await Buku.findOrFail(bukuId)

            response.json({
                status: 'success',
                message: `Success retrieving buku with id of ${bukuId}`,
                data: bukuData,
            })
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({
                    status: 'error',
                    message: `Buku not found with id of ${bukuId}`,
                })
            } else {
                return response.status(500).json({
                    status: 'error',
                    message: error.message || 'Internal server error',
                })
            }
        }
    }

    public async update({ request, response }: HttpContextContract) {
        const bukuId = request.param('id')
        try {
            const payload = await request.validate(BukuValidator)

            // Using query builder
            // const updatedRows = await Database
            //     .from('bukus')
            //     .where('id', bukuId)
            //     .update(payload)

            // Using ORM
            const bukuData = await Buku.findOrFail(bukuId)
            bukuData.merge(payload)
            const updatedBuku = await bukuData.save()

            response.json({
                status: 'success',
                message: `Success updating buku with id of ${bukuId}`,
                data: updatedBuku,
            })
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({
                    status: 'error',
                    message: `Buku not found with id of ${bukuId}`,
                })
            } else if (error.code === 'E_VALIDATION_FAILURE') {
                return response.status(400).json({
                    status: 'error',
                    message: 'Error validating buku data',
                    errors: error.messages,
                })
            } else {
                return response.status(500).json({
                    status: 'error',
                    message: error.message || 'Internal server error',
                })
            }
        }
    }

    public async destroy({ request, response }: HttpContextContract) {
        const bukuId = request.param('id')

        try {
            // Using query builder
            // await Database.from('bukus')
            //     .where('id', bukuId)
            //     .delete()

            // Using ORM
            const bukuData = await Buku.findOrFail(bukuId)
            await bukuData.delete()

            return response.json({
                status: 'success',
                message: `Buku with id of ${bukuId} deleted successfully`,
                data: bukuData,
            })
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({
                    status: 'error',
                    message: `Buku not found with id of ${bukuId}`,
                })
            } else {
                return response.status(500).json({
                    status: 'error',
                    message: error.message || 'Internal server error',
                })
            }
        }
    }
}
