let fs = require('fs');
let files = ["../text/f1.txt" , "../text/f2.txt" , "../text/f3.txt"];

for (let i in files) {
    let pp = fs.promises.readFile(files[i]);
    pp.then(function(data) {
        console.log(data+"");
    })
    pp.catch(function(error) {
        console.log("ERROR");
    })
}