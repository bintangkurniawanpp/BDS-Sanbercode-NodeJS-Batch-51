import Kelas from "./kelas";

class Bootcamp {
    constructor(name) {
        this._name = name;
        this._classes = [];
    }

    get name() {
        return this._name;
    }

    get classes() {
        return this._classes;
    }

    createClass(name, level, instructor) {
        const newClass = new Kelas(name, level, instructor);
        this._classes.push(newClass);
        return newClass;
    }

    register(className, student) {
        const targetClass = this._classes.find((kelas) => kelas.name === className);
        if (targetClass) {
            targetClass.addStudent(student);
        } else {
            console.log(`Kelas ${className} tidak ditemukan.`);
        }
    }
}
  
 module.exports = Bootcamp;