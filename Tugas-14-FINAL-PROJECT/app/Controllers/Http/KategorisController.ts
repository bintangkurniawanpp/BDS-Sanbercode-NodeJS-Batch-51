import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KategoriValidator from 'App/Validators/KategoriValidator'
import Kategori from 'App/Models/Kategori'
// import Database from '@ioc:Adonis/Lucid/Database'

export default class KategorisController {
    public async index({ response }: HttpContextContract) {
        try {
            // Using query builder 
            // const kategorisData = await Database.from('kategoris').select('*')

            // Using ORM
            // const kategorisData = await Kategori.all();
            const kategorisData = await Kategori.query().preload('bukus')

            response.status(200).json({
                status: 'success',
                message: 'Success retrieving all kategori',
                data: kategorisData
            })

        } catch (error) {
            return response.status(500).json({
                status: 'error',
                message: error.message || 'Internal server error',
            });
        }
    }

    public async store({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(KategoriValidator)
            
            // Using query builder 
            // const kategoriData = await Database
            //     .table('kategoris')
            //     .insert(payload)

            // Using ORM
            const kategoriData = await Kategori.create(payload)
                
            response.status(201).json({
                status: 'success',
                message: 'Success inserting kategori',
                data: {
                    id: kategoriData.id,
                    nama: kategoriData.nama,
                }
            })

        } catch (error) {            
            if (error.code === 'E_VALIDATION_FAILURE') {
                return response.status(400).json({
                  status: 'error',
                  message: 'Error validating kategori data'
                })
            } else {
                return response.status(500).json({
                    status: 'error',
                    message: error.messages
                })
            }
        }
    }

    public async show({ request, response }: HttpContextContract) {
        const kategoriId = request.param('id')
        try {
            // Using query builder  
            // const kategoriData = await Database.from('kategoris').where('id', kategoriId).first()

            // Using ORM
            const kategoriData = await Kategori.query().where('id', kategoriId).preload('bukus').firstOrFail()

            response.json({
                status: 'success',
                message: `Success retrieving kategori with id of ${kategoriId}`,
                data: kategoriData,
            })

        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({
                    status: 'error',
                    message: `Kategori not found with id of ${kategoriId}`
                })
            } else {
                return response.status(500).json({
                    status: 'error',
                    message: error.messages
                })
            }
        }
    }

    public async update({ request, response }: HttpContextContract) {
        const kategoriId = request.param('id')
        try {
            const payload = await request.validate(KategoriValidator)

            // Using query builder
            // const updatedRows = await Database
            //     .from('kategoris')
            //     .where('id', kategoriId)
            //     .update(payload)

            // Using ORM
            const kategoriData = await Kategori.findOrFail(kategoriId)    
            kategoriData.nama = payload.nama
            const updatedKategori = await kategoriData.save()

            response.json({
                status: 'success',
                message: `Success updating kategori with id of ${kategoriId}`,
                data: updatedKategori
            })

        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({
                    status: 'error',
                    message: `Kategori not found with id of ${kategoriId}`,
                })
            } else if (error.code === 'E_VALIDATION_FAILURE') {
                return response.status(400).json({
                    status: 'error',
                    message: 'Error validating kategori data',
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
        const kategoriId = request.param('id')
        try {
            // Using query builder
            // await Database.from('kategoris')
            //     .where('id', kategoriId)
            //     .delete()

            // Using ORM
            const kategoriData = await Kategori.findOrFail(kategoriId)
            await kategoriData.delete()  

            return response.json({
                status: 'success',
                message: `Kategori with id of ${kategoriId} deleted successfully`,
                data: kategoriData
            })

        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({
                    status: 'error',
                    message: `Kategori not found with id of ${kategoriId}`
                })
            } else {
                return response.status(500).json({
                    status: 'error',
                    message: error.messages
                })
            }
        }
    }
}

