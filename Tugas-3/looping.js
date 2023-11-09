var i;
var j;

// Soal 1
console.log('LOOPING PERTAMA');
i = 2;
while (i <= 20) {
  console.log(i + ' - I love coding');
  i += 2;
}

console.log('LOOPING KEDUA');
i = 20;
while (i >= 2) {
  console.log(i + ' - I will become a mobile developer');
  i -= 2;
}


// Soal 2
for (j = 1; j <= 20; j++) {
    if (j % 3 === 0 && j % 2 !== 0) {
      console.log(j + ' - I Love Coding');
    } else if (j % 2 === 0) {
      console.log(j + ' - Berkualitas');
    } else {
      console.log(j + ' - Santai');
    }
}

// Soal 3
function makeRectangle(panjang, lebar) {
    var row;
    for (i = 0; i < lebar; i++) {
        row = '';
      for (j = 0; j < panjang; j++) {
        row += '#';
      }
      console.log(row);
    }
}
makeRectangle(8, 4);

// Soal 4
function makeLadder(sisi) {
    var row;
    for (i = 1; i <= sisi; i++) {
        row = '';
      for (j = 1; j <= i; j++) {
        row += '#';
      }
      console.log(row);
    }
}
  
makeLadder(7);

  

