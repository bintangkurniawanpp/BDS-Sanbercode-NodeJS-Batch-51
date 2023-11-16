import Bootcamp from "./lib/bootcamp";

const args = process.argv;
const command = args[2];
const input = args[3];

switch (command) {
    case 'register':
        Bootcamp.register(input);
        break;
    case 'login':
       Bootcamp.login(input);
        break;
    case 'addSiswa':
        Bootcamp.addSiswa(input);
        break;
    default:
        console.log('Command tidak tersedia');
}