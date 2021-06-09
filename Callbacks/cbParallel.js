let fs = require('fs');

fs.readFile('text/f1.txt', function(err, data) {
    console.log(data+"");
})
fs.readFile('text/f2.txt', function(err, data) {
    console.log(data+"");
})
fs.readFile('text/f3.txt', function(err, data) {
    console.log(data+"");
})

// Here, any callback can be invoked randomly. There is no particular sequence.
// For sequencing, try cb-Serial.