// If-else
var nama = "John";
var peran = "";

if (nama === "") {
  console.log("Nama harus diisi!");
} else if (nama !== "" && peran === "") {
  console.log("Halo " + nama + ", Pilih peranmu untuk memulai game!");
} else if (peran === "Penyihir") {
  console.log("Selamat datang di Dunia Werewolf, " + nama);
  console.log("Halo Penyihir " + nama + ", kamu dapat melihat siapa yang menjadi werewolf!");
} else if (peran === "Guard") {
  console.log("Selamat datang di Dunia Werewolf, " + nama);
  console.log("Halo Guard " + nama + ", kamu akan membantu melindungi temanmu dari serangan werewolf.");
} else if (peran === "Werewolf") {
  console.log("Selamat datang di Dunia Werewolf, " + nama);
  console.log("Halo Werewolf " + nama + ", Kamu akan memakan mangsa setiap malam!");
} else {
  console.log("Peran yang Anda pilih tidak valid. Pilih peran yang sesuai: Penyihir, Guard, atau Werewolf.");
}

// switch case
var hari = 21;
var bulan = 1;
var tahun = 1945;

var namaBulan;

switch (bulan) {
  case 1:
    namaBulan = 'Januari';
    break;
  case 2:
    namaBulan = 'Februari';
    break;
  case 3:
    namaBulan = 'Maret';
    break;
  case 4:
    namaBulan = 'April';
    break;
  case 5:
    namaBulan = 'Mei';
    break;
  case 6:
    namaBulan = 'Juni';
    break;
  case 7:
    namaBulan = 'Juli';
    break;
  case 8:
    namaBulan = 'Agustus';
    break;
  case 9:
    namaBulan = 'September';
    break;
  case 10:
    namaBulan = 'Oktober';
    break;
  case 11:
    namaBulan = 'November';
    break;
  case 12:
    namaBulan = 'Desember';
    break;
  default:
    namaBulan = 'Bulan tidak valid';
    break;
}

if (namaBulan !== 'Bulan tidak valid') {
  console.log(hari + ' ' + namaBulan + ' ' + tahun);
} else {
  console.log(namaBulan);
}