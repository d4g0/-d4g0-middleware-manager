const MiddlewareManager = require('./index.js');
const app = new MiddlewareManager();

app.use('addUser', printUser, changeUserName, printReverseUser);



function printUser(input, next) {
    console.log(input.name);
    next();
}

function printReverseUser(input, next) {
    console.log(input.name.split('').reverse().join(''));
    next();
}


function changeUserName(input, next) {
    input.name += ' n ';
    console.log(input.name);
    next()
}

app.handleInput({ route: 'addUser', name: 'university' })

// test
app.use(['name', '-n'], function nameReport(input, next) {
    console.log(`Doing a name reporting`);
    console.log(input.name)
})


app.handleInput({ route: 'name', name: 'lolo' })

app.handleInput({ route: '-n', name: 'lolosama' })
