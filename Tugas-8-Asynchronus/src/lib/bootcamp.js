import Employee from "./employee";
import fs from 'fs';
import * as fsPromise from 'node:fs/promises';

const path = 'data.json'

class Bootcamp {
    // Soal 1 Callback
    static register (input) {
        let [name, password, role] = input.split(',');
        let employees = [];
        fs.readFile(path, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            try {
                employees = JSON.parse(data);
            } catch (err) {
                console.error(err);
                return;
            }

            const employee = new Employee(name, password, role);
            employees.push(employee);

            fs.writeFile(path, JSON.stringify(employees), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Berhasil register');
                }
            });
        });
        
    }

    // Soal 2 Promise
    static login (input) {
        let [name, password] = input.split(',');
        let employees = [];
    
        fsPromise.readFile(path, 'utf8')
            .then((data) => {
                try {
                    employees = JSON.parse(data);
                } catch (err) {
                    console.error(err);
                    throw err;
                }
    
                const user = employees.find((user) => user.name === name && user.password === password);
    
                if (user) {
                    user.isLogin = true;
    
                    return fsPromise.writeFile(path, JSON.stringify(employees), 'utf8')
                        .then(() => {
                            console.log('Berhasil Login');
                        });
                } else {
                    // cek dengan some method
                    const userExists = employees.some((user) => user.name === name);
                    if (userExists) {
                        console.log('Login gagal, password salah');
                    } else {
                        console.log('Login gagal, user tidak ditemukan');
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }

    // Soal 3 Async Await
    static async addSiswa(input) {
        const [siswaName, trainerName] = input.split(',');
    
        try {
            let employees = await fsPromise.readFile(path, 'utf8');
            employees = JSON.parse(employees);
    
            const admin = employees.find((user) => user.role === 'admin' && user.isLogin);
    
            if (admin) {
                const trainerIndex = employees.findIndex((user) => user.name === trainerName && user.role === 'trainer');
    
                if (trainerIndex !== -1) {
                    if (!employees[trainerIndex].students) {
                        employees[trainerIndex].students = [];
                    }
    
                    employees[trainerIndex].students.push({ name: siswaName });
    

                    await fsPromise.writeFile(path, JSON.stringify(employees), 'utf8');
                    console.log('Berhasil add siswa');
                } else {
                    console.log('Trainer tidak ditemukan');
                }
            } else {
                console.log('Login sebagai admin untuk menambahkan siswa');
            }
        } catch (err) {
            console.error(err);
        }
    }
    

}

export default Bootcamp;