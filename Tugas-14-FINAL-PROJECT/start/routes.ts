/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
    // Kategori route
    Route.resource('kategori', 'KategorisController')
      .apiOnly()
      .middleware({
        index: ['auth', 'isVerified'],
        show: ['auth', 'isVerified', 'isAdmin'],
        store: ['auth', 'isVerified', 'isAdmin'],
        update: ['auth', 'isVerified', 'isAdmin'],
        destroy: ['auth', 'isVerified', 'isAdmin'],
      })
    // Buku Route
    Route.resource('buku', 'BukusController')
      .apiOnly()
      .middleware({
        index: ['auth', 'isVerified'],
        show: ['auth', 'isVerified', 'isAdmin'],
        store: ['auth', 'isVerified', 'isAdmin'],
        update: ['auth', 'isVerified', 'isAdmin'],
        destroy: ['auth', 'isVerified', 'isAdmin'],
      })
    // Peminjaman route
    Route.post('/buku/:id/peminjaman', 'PeminjamenController.store').middleware(['auth', 'isVerified', 'userOnly'])
    Route.get('/peminjaman', 'PeminjamenController.index').middleware(['auth', 'isVerified', 'isAdmin'])
    Route.get('/peminjaman/:id', 'PeminjamenController.show').middleware(['auth', 'isVerified', 'isAdmin'])
    // Auth route
    Route.group(() => {
      Route.post('/register', 'AuthController.register')
      Route.post('/login', 'AuthController.login')
      Route.post('/otp-confirmation', 'Authcontroller.otpConfirm').middleware('auth')
      Route.get('/me', 'AuthController.me').middleware('auth')
      Route.post('/profile', 'Authcontroller.updateProfile').middleware('auth')
    }).prefix('auth')
  }).prefix('/api/v1')