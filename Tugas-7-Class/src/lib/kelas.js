class Kelas {
    constructor(name, level, instructor) {
        this._name = name;
        this._students = [];

        // Cek level
        const allowedLevels = ['beginner', 'intermediate', 'advanced'];
        if (!allowedLevels.includes(level)) {
          throw new Error(`Level ${level} tidak tersedia. Level yang tersedia : ${allowedLevels.join(', ')}.`);
        }

        this._level = level;
        this._instructor = instructor;
    }

    get name() {
        return this._name;
    }

    get students() {
        return this._students;
    }

    get level() {
        return this._level;
    }

    set level(newLevel) {
        this._level = newLevel;
    }

    get instructor() {
        return this._instructor;
    }

    set instructor(newInstructor) {
        this._instructor = newInstructor;
    }

    addStudent(student) {
        this._students.push(student);
    }
}
  
module.exports = Kelas;