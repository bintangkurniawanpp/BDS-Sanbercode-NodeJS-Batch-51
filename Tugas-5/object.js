// Soal 1
function arrayToObject(arr) {
    var now = new Date();
    var thisYear = now.getFullYear();
  
    for (var i = 0; i < arr.length; i++) {
        var personArr = arr[i];
        var objPerson = {
        firstName: personArr[0],
        lastName: personArr[1],
        gender: personArr[2],
        };

        if (!personArr[3] || personArr[3] > thisYear) {
        objPerson.age = "Invalid Birth Year";
        } else {
        objPerson.age = thisYear - personArr[3];
        }

        var fullName = objPerson.firstName + " " + objPerson.lastName;
        console.log(i + 1 + ". " + fullName + ": ", objPerson);
    }
}

console.log('OUTPUT SOAL 1');
// Driver Code
var people = [
    ["Bruce", "Banner", "male", 1975],
    ["Natasha", "Romanoff", "female"],
];
arrayToObject(people);

var people2 = [
    ["Tony", "Stark", "male", 1980],
    ["Pepper", "Pots", "female", 2023],
];
arrayToObject(people2);

// Error case
arrayToObject([]);

// Soal 2
function naikAngkot(arrPenumpang) {
    var rute = ['A', 'B', 'C', 'D', 'E', 'F'];
    var result = [];

    for (var i = 0; i < arrPenumpang.length; i++) {
        var penumpangObj = {
            penumpang: arrPenumpang[i][0],
            naikDari: arrPenumpang[i][1],
            tujuan: arrPenumpang[i][2],
            bayar: 0,
        };

        var naikDariIndex = rute.indexOf(penumpangObj.naikDari);
        var tujuanIndex = rute.indexOf(penumpangObj.tujuan);

        var jarak = tujuanIndex - naikDariIndex;
        penumpangObj.bayar = jarak * 2000;

        result.push(penumpangObj);
    }

    return result;
}

console.log('\nOUTPUT SOAL 2');
console.log(naikAngkot([['Dimitri', 'B', 'F'], ['Icha', 'A', 'B']]));
// [ { penumpang: 'Dimitri', naikDari: 'B', tujuan: 'F', bayar: 8000 },
//   { penumpang: 'Icha', naikDari: 'A', tujuan: 'B', bayar: 2000 } ]

console.log(naikAngkot([])); // []


// Soal 3
function nilaiTertinggi(siswa) {
    var result = {};
  
    for (var i = 0; i < siswa.length; i++) {
      var kelas = siswa[i].class;
      var currentScore = siswa[i].score;
  
      if (!result[kelas] || currentScore > result[kelas].score) {
            result[kelas] = {
            name: siswa[i].name,
            score: currentScore};
        }
    }
  
    return result;
}
  

console.log('\nOUTPUT SOAL 3');
console.log(nilaiTertinggi([
    {
    name: 'Asep',
    score: 90,
    class: 'adonis'
    },
    {
    name: 'Ahmad',
    score: 85,
    class: 'vuejs'
    },
    {
    name: 'Regi',
    score: 74,
    class: 'adonis'
    },
    {
    name: 'Afrida',
    score: 78,
    class: 'reactjs'
    }
]));
  
// {
//   adonis: { name: 'Asep', score: 90 },
//   vuejs: { name: 'Ahmad', score: 85 },
//   reactjs: { name: 'Afrida', score: 78}
// }
  
console.log(nilaiTertinggi([
    {
    name: 'Bondra',
    score: 100,
    class: 'adonis'
    },
    {
    name: 'Putri',
    score: 76,
    class: 'laravel'
    },
    {
    name: 'Iqbal',
    score: 92,
    class: 'adonis'
    },
    {
    name: 'Tyar',
    score: 71,
    class: 'laravel'
    },
    {
    name: 'Hilmy',
    score: 80,
    class: 'vuejs'
    }
]));
  
// {
//   adonis: { name: 'Bondra', score: 100 },
//   laravel: { name: 'Putri', score: 76 },
//   vuejs: { name: 'Hilmy', score: 80 }
// }
  
  