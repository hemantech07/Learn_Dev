let fs = require('fs');

let testPath = './test';
let contents = fs.readdirSync(testPath);
for (let i in contents) {
    let path = testPath + '/' + contents[i];
    fs.rmSync(path);
}
console.log(contents);