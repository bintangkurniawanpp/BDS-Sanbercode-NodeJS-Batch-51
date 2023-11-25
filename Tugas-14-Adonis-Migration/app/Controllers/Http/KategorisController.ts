import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KategoriValidator from 'App/Validators/KategoriValidator'
import Database from '@ioc:Adonis/Lucid/Database'



export default class KategorisController {
    public async index({ response }: HttpContextContract) {
        try {
            const kategoriData = await Database.from('kategoris').select('*')
            response.json({
                status: 'success retrieving kategoris data',
                data: kategoriData
            })
        } catch (error) {
            console.error('Error fetching kategoris:', error)

            return response.status(500).json({
                status: 'Error fetching kategoris',
                message: 'Internal server error'
            })
        }
    }

    public async store({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(KategoriValidator)
            const kategoriData = await Database
                .table('kategoris')
                .insert(payload)

            response.status(201).json({
                status: 'success inserting kategori',
                data: kategoriData
            })
        } catch (error) {
            if (error.code === 'E_VALIDATION_FAILURE') {
                return response.status(400).json({
                  status: 'error validating kategori data',
                  errors: error.messages})
            } else {
                return response.status(500).json({
                    status: 'error inserting kategori',
                    message: 'Internal server error'
                })
            }
        }
    }

    public async show({ request, response }: HttpContextContract) {
        const kategoriId = request.param('id')
        try {
            const kategoriData = await Database.from('kategoris').where('id', kategoriId).first()

            if (!kategoriData) {
                return response.status(404).json({
                    status: 'error',
                    message: 'Kategori not found',
                })
            }
            response.json({
                status: 'success retrieving kategori',
                data: kategoriData,
            })
        } catch (error) {
            console.error('Error fetching kategori:', error)

            return response.status(500).json({
                status: 'error',
                message: 'Internal server error',
            })
        }
    }

    public async update({ request, response }: HttpContextContract) {
        const kategoriId = request.param('id')
        try {
            const payload = await request.validate(KategoriValidator)

            const updatedRows = await Database
                .from('kategoris')
                .where('id', kategoriId)
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
        const kategoriId = request.param('id')

        try {
            await Database.from('kategoris')
                .where('id', kategoriId)
                .delete()


            return response.json({
                status: 'success',
                message: 'Kategori deleted successfully',
            })
        } catch (error) {
            console.error('Error deleting kategori:', error)

            return response.status(500).json({
                status: 'error',
                message: 'Internal server error',
            })
        }
    }
}

