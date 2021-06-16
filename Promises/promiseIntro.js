const fs = require('fs');

let pendingPromise = fs.promises.readFile('./text/f1.txt');
// console.log(pendingPromise);
// Promise<pending>

pendingPromise.then(function(data) {
    // State Changes
    console.log(pendingPromise);
    console.log("Inside Success-CallBack");
})

pendingPromise.catch(function(err) {
    console.log(pendingPromise);
    console.log("Inside Failure-CallBack");
})
