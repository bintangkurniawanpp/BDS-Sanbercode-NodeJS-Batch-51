import fs from 'fs';
import { promises as fsPromises } from 'fs';

const path = 'data.json';


export const registerKaryawan = (req, res) => {
    let {name, password, role} = req.body;
    if (!name || !password || !role) {
        return res.status(400).json({ message: 'Invalid request. Tolong sertakan name, password, and role.' });
    }

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Read file error', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        let employees = [];
        try {
            employees = JSON.parse(data);
        } catch (err) {
            console.error('Error parsing JSON:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const newEmployee = {
            name: name,
            password: password,
            role: role,
            isLogin: false
        };

        employees.push(newEmployee);

        fs.writeFile(path, JSON.stringify(employees), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            console.log('Berhasil register');
            res.json({ message: 'Berhasil register' });
        });
    });
}

export const getAllKaryawan = (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Read file error', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        let employees = [];
        try {
            employees = JSON.parse(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Server Error' });
        }

        const responseData = {
            message: 'Berhasil get karyawan',
            data: employees
        };

        res.json(responseData);
    });
}

export const loginKaryawan = (req,res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: 'Invalid request. Please provide name and password.' });
    }

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        let employees = [];
        try {
            employees = JSON.parse(data);
        } catch (err) {
            console.error('Error parsing JSON:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const foundEmployee = employees.find(employee => employee.name === name && employee.password === password);

        if (foundEmployee) {
            foundEmployee.isLogin = true;

            fs.writeFile(path, JSON.stringify(employees), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                console.log('Berhasil login');
                res.json({ message: 'Berhasil login' });
            });
        } else {
            console.error('Login failed: Invalid credentials');
            res.status(401).json({ message: 'Login failed. Cek kembali name dan password.' });
        }
    });
}


export const addSiswa = async (req, res) => {
    const { name: siswaName, class: className } = req.body;
    const trainerName = req.params.name;

    try {

        let employees = await fsPromises.readFile(path, 'utf8');
        employees = JSON.parse(employees);

        const admin = employees.find((user) => user.role === 'admin' && user.isLogin);

        if (!admin) {
            console.log('Admin harus login');
            return res.status(401).json({ message: 'Admin harus login' });
        }

        const trainerIndex = employees.findIndex((user) => user.name === trainerName && user.role === 'trainer');

        if (trainerIndex === -1) {
            console.log('Trainer not found');
            return res.status(404).json({ message: 'Trainer not found.' });
        }

        if (!employees[trainerIndex].students) {
            employees[trainerIndex].students = [];
        }

        const newStudent = { name: siswaName, class: className };
        employees[trainerIndex].students.push(newStudent);

        await fsPromises.writeFile(path, JSON.stringify(employees), 'utf8');
        console.log('Berhasil add siswa');
        res.json({ message: 'Berhasil add siswa' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
