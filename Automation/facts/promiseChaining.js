let fs = require('fs');

let pp = fs.promises.readFile('./f1.txt');
pp.then(function(data) {
    console.log(data+"");
    let f2KaPromise = fs.promises.readFile('./f2.txt');
    return f2KaPromise;
})
.then(function(data) {
    console.log(data+"");
})

// Disadvantage => Lengthy Code