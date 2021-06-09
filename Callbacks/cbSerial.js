let fs = require('fs');

fs.readFile('text/f1.txt', function(err, data) {
    console.log(data+"");
    fs.readFile('text/f2.txt', function(err, data) {
        console.log(data+"");
        fs.readFile('text/f3.txt', function(err, data) {
            console.log(data+"");
        })
    })
})

// Here Sequence gets Maintained.
// But this is a disadvantage of callback - popularly known as CallBack Hell.