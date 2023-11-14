// Soal 3
const checkScore = (stringData) => {
    const [name, kelas, score] = stringData.split(',').map(item => item.split(':'));
    return { name: name[1], kelas: kelas[1], score: parseInt(score[1]) };
};
  
export default checkScore;
  