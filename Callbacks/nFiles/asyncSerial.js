let fs = require('fs');

let files = ["../text/f1.txt" , "../text/f2.txt" , "../text/f3.txt"];

output(0);

function output(i) {
    if (i>=files.length)
        return;
    fs.readFile(files[i], function(err, data) {
        console.log(data+"");
        output(i+1);
    })
}