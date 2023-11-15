"use strict";

var _bootcamp = _interopRequireDefault(require("./lib/bootcamp"));
var _student = _interopRequireDefault(require("./lib/student"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var sanber = new _bootcamp["default"]("sanbercode");
sanber.createClass("Laravel", "beginner", "abduh");
sanber.createClass("React", "beginner", "abdul");
var names = ["regi", "ahmad", "bondra", "iqbal", "putri", "rezky"];
names.map(function (nama, index) {
  var newStud = new _student["default"](nama);
  var kelas = sanber.classes[index % 2].name;
  sanber.register(kelas, newStud);
});

// menampilkan data kelas dan student nya
sanber.classes.forEach(function (kelas) {
  console.log(kelas);
});