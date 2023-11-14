"use strict";

var _sapa = _interopRequireDefault(require("./lib/sapa.js"));
var _convert = _interopRequireDefault(require("./lib/convert.js"));
var _checkScore = _interopRequireDefault(require("./lib/checkScore.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var command = process.argv[2];
switch (command) {
  case 'sapa':
    console.log((0, _sapa["default"])(process.argv[3]));
    break;
  case 'convert':
    console.log((0, _convert["default"])(process.argv[3], process.argv[4], process.argv[5]));
    break;
  case 'checkScore':
    console.log((0, _checkScore["default"])(process.argv[3]));
    break;
  default:
    console.log('Command tidak tersedia');
}