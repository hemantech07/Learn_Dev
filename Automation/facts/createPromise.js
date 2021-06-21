const fs = require('fs');

// Promisified function => With it's help, sending data to then() is in our control.
function myPromisifiedFun(filePath) {
    return new Promise(function(scb, fcb) {
        fs.readFile(filePath, function(err, data) {
            if (err) {
                fcb(err);
            } else {
                scb(data+" via promisfied function");
            }
        })
    });
}

let pp = myPromisifiedFun('./f1.txt');
pp.then(function(data) {
    console.log(data+"");
})
pp.catch(function(err) {
    console.log("ERROR");
})