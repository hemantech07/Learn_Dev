const fs = require('fs');
console.log("START");

// Async Function => Add async keyword before normal function
// Await keyword is used inside async function
async function asyncFun() {
    // It also works asyncly because of presence of await keyword in async function definition.
    // Use of await keyword returns data, else promise
    try {
        let f1KaPromise = fs.promises.readFile('./f1.txt' , 'utf8');
        let f2KaPromise = fs.promises.readFile('./f2.txt' , 'utf8');
        let combinedData = await Promise.all([f1KaPromise, f2KaPromise]);
        console.log(combinedData);

        let f1KaData = await fs.promises.readFile('./f1.txt');
        console.log(f1KaData+"");
        let f2KaData = await fs.promises.readFile('./f2.txt');
        console.log(f2KaData+"");
        }
    catch(err) {
        console.log(err);
    }
}
asyncFun();

console.log("END");