"use strict";

var _functions = require("./lib/functions.js");
// import sapa from './lib/sapa.js';
// import convert from './lib/convert.js';
// import checkScore from './lib/checkScore.js';

var command = process.argv[2];
switch (command) {
  case 'sapa':
    console.log((0, _functions.sapa)(process.argv[3]));
    break;
  case 'convert':
    console.log((0, _functions.convert)(process.argv[3], process.argv[4], process.argv[5]));
    break;
  case 'checkScore':
    console.log((0, _functions.checkScore)(process.argv[3]));
    break;
  default:
    console.log('Command tidak tersedia');
}