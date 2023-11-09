var input = [
    ["0001", "Roman Alamsyah", "Bandar Lampung", "21/05/1989", "Membaca"],
    ["0002", "Dika Sembiring", "Medan", "10/10/1992", "Bermain Gitar"],
    ["0003", "Winona", "Ambon", "25/12/1965", "Memasak"],
    ["0004", "Bintang Senjaya", "Martapura", "6/4/1970", "Berkebun"],
];

function dataHandling(data) {
    var output = "";
    for (var i = 0; i < data.length; i++) {
        output += "Nomor ID : " + data[i][0] + "\n";
        output += "Nama Lengkap : " + data[i][1] + "\n";
        output += "TTL : " + data[i][2] + " " + data[i][3] + "\n";
        output += "Hobi : " + data[i][4] + "\n \n";
    }
    return output;
}

function balikKata(kata) {
    var reversed = "";
    for (var i = kata.length - 1; i >= 0; i--) {
        reversed += kata[i];
    }
    return reversed;
}

console.log(dataHandling(input));
console.log(balikKata("SanberCode"));
console.log(balikKata("racecar"));
console.log(balikKata("kasur rusak")); 
console.log(balikKata("haji ijah")); 
console.log(balikKata("I am Sanbers"));


