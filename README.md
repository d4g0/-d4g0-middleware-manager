# Middleware Manager

A simple and plugable MiddlewareManager for arrange logic in `cli` apps.


## How to use it

```js
// example.js

const MiddlewareManager = require('./index.js');
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
```
