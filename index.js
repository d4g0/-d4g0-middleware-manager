const MiddlewareManager = require('./MiddlewareManager.js');
const app = new MiddlewareManager();

app.use('addUser', printUser, printReverseUser);



function printUser(input, next) {
    console.log(input.name);
    next();
}

function printReverseUser(input, next) {
    console.log(input.name.split('').reverse().join('') ); 
    // next();
}


app.handleInput({ route: 'addUser', name: 'university' })