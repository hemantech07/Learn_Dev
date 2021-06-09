let fs  = require('fs');

console.log("Synchronous Approach");

console.log('Start');

var data = fs.readFileSync("text/f1.txt");
console.log(data+"");

console.log('End');

console.log("Asynchronous Approach");

console.log('Start');

fs.readFile("text/f1.txt", function(error, data) {
    // console.log("Error- "+error);
    console.log("Data- "+data+"");
});

console.log('End');