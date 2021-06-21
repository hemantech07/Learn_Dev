let fs = require('fs');
let files = ["../text/f1.txt" , "../text/f2.txt" , "../text/f3.txt"];

/* for (let i in files) {
    let pp = fs.promises.readFile(files[i]);
    pp.then(function(data) {
        console.log(data+"");
    })
    pp.catch(function(error) {
        console.log("ERROR");
    })
} */

let f1KaPromise = fs.promises.readFile(files[0]);
for (let i=1; i<files.length; i++) {
    f1KaPromise = f1KaPromise.then(function(data) {
        console.log(data+"");
        let nextFilePromise = fs.promises.readFile(files[i]);
        return nextFilePromise;
    })
}

f1KaPromise.then(function(data) {
    console.log(data+"");
})