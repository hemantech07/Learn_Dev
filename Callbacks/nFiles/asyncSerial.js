let fs = require('fs');

let files = ["../text/f1.txt" , "../text/f2.txt" , "../text/f3.txt"];

// Recursive Approach: PASS
output(0);

function output(i) {
    if (i>=files.length)
        return;
    fs.readFile(files[i], function(err, data) {
        console.log(data+"");
        output(i+1);
    })
}

// Iterative Approach: FAIL
// (Maybe stuck in event loop)
let i=0;

while (i<files.length) {
    fs.readFile(files[i], function(err, data) {
        console.log(data+"");
        i+=1;
    })
}
