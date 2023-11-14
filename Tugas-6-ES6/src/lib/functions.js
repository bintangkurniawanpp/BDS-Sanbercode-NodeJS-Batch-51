// Soal 1
const sapa = (nama) => {
    return `halo selamat pagi, ${nama}`;
};

// Soal 2
const convert = (nama, domisili, umur) => {
    return { nama, domisili, umur };
};
  
// Soal 3
const checkScore = (stringData) => {
    const [name, kelas, score] = stringData.split(',').map(item => item.split(':'));
    return { name: name[1], kelas: kelas[1], score: parseInt(score[1]) };
};

export { sapa, convert, checkScore }
