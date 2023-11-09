// Soal 1
function teriak() {
    return 'Halo Sanbers!';
}

// Soal 2
function kalikan(num1, num2) {
    return num1*num2;
}

// Soal 3
function introduce(name, age, address, hobby) {
    // return 'Nama saya' + name + ' umur saya ' + age + ' tahun, alamat saya di ' + address + ' dan saya punya hobby yaitu' + hobby + '!';
    return `Nama saya ${name}, umur saya ${age} tahun, alamat saya di ${address}, dan saya punya hobby yaitu ${hobby}!`;
}

console.log(teriak());
console.log(kalikan(4, 12));
console.log(introduce("Agus", 30, "Jogja", "Gaming"))