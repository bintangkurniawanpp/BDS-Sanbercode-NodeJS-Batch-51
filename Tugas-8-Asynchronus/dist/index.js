"use strict";

var _bootcamp = _interopRequireDefault(require("./lib/bootcamp"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var args = process.argv;
var command = args[2];
var input = args[3];
switch (command) {
  case 'register':
    _bootcamp["default"].register(input);
    break;
  case 'login':
    _bootcamp["default"].login(input);
    break;
  case 'addSiswa':
    _bootcamp["default"].addSiswa(input);
    break;
  default:
    console.log('Command tidak tersedia');
}