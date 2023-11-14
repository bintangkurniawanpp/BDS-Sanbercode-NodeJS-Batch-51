// import sapa from './lib/sapa.js';
// import convert from './lib/convert.js';
// import checkScore from './lib/checkScore.js';

import { sapa, convert, checkScore } from './lib/functions.js'

const command = process.argv[2];

switch (command) {
    case 'sapa':
        console.log(sapa(process.argv[3]));
        break;
    case 'convert':
        console.log(convert(process.argv[3], process.argv[4], process.argv[5]));
        break;
    case 'checkScore':
        console.log(checkScore(process.argv[3]));
        break;
    default:
        console.log('Command tidak tersedia');
}