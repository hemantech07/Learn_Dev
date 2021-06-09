let fs = require('fs');

let files = ["../text/f1.txt" , "../text/f2.txt" , "../text/f3.txt"];

for (let i in files) {
    fs.readFile(files[i], function(err, data) {
        console.log(data+"");
    })
}