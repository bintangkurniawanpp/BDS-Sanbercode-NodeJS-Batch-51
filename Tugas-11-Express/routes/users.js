// routes/users.js
import express from 'express';
import {registerKaryawan, getAllKaryawan, loginKaryawan, addSiswa}  from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerKaryawan);
router.post('/login', loginKaryawan);
router.get('/karyawan', getAllKaryawan);
router.post('/karyawan/:name/siswa', addSiswa);

export default router;

