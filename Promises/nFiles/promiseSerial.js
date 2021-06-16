let fs = require('fs');
let files = ["../text/f1.txt" , "../text/f2.txt" , "../text/f3.txt"];
output(0);
function output(i) {
    if (i>=files.length)
        return;
    let pp = fs.promises.readFile(files[i]);
    pp.then(function(data) {
        console.log(data+"");
        output(i+1);
    })
    pp.catch(function(err) {
        console.log("ERROR in file - " + files[i]);
        output(i+1);
    })
}