import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Buku from 'App/Models/Buku'
import User from 'App/Models/User'
import Peminjaman from 'App/Models/Peminjaman'
import PeminjamanValidator from 'App/Validators/PeminjamanValidator'

export default class PeminjamenController {

    public async index({ response }: HttpContextContract) {
        try {
            const peminjamanData = await Peminjaman.query()
            .preload('user')
            .preload('buku')

            response.status(200).json({
                status: 'success',
                message: 'Success retrieving peminjaman data',
                data: peminjamanData,
            })
            
        } catch (error) {
            return response.status(500).json({
                status: 'error',
                message: error.message || 'Internal server error',
            })   
        }
    }

    public async store({ request, response, auth }: HttpContextContract) {
        try {
            const bukuId = request.param('id')
            const user = auth.user as User 
    
            // Get validate request
            await request.validate(PeminjamanValidator)
            // Get the validated data
            const { tanggal_pinjam, tanggal_kembali } = request.only(['tanggal_pinjam', 'tanggal_kembali'])
            // Im using attach
            await Buku.query().where('id', bukuId).preload('users').then(async (buku) => {
                await buku[0].related('users').attach({
                  [user.id]: {
                    tanggal_pinjam,
                    tanggal_kembali,
                  },
                })
            })
    
            response.status(200).json({
                status: 'success',
                message: 'Peminjaman succeed',
            })
        } catch (error) {
            console.log(error)
            return response.status(500).json({
                status: 'error',
                message: error.message || 'Internal server error',
            })
            
        }
    }

    public async show({ request, response}: HttpContextContract) {
        try {
            const peminjamanId = request.param('id')
            const peminjamanData = await Peminjaman.query()
            .where('id', peminjamanId)
            .preload('user', (query) => {
              query.select(['id', 'nama', 'email']);
            })
            .first()

            response.status(200).json({
                status: 'success',
                message: 'Success retrieving peminjaman data',
                data: peminjamanData,
            })

        } catch (error) {
            return response.status(500).json({
                status: 'error',
                message: error.message || 'Internal server error',
            })  
        }
    }


}
