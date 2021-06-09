let fs = require('fs');
let extensions = require('./extensions');

let mixFolderPath = '/mixFolder';
let contents = fs.readdirSync(mixFolderPath);

/*
Steps - 
for loop in contents of mixFolder:
    sort(content)

sort(content):
    if (file)
        sort(file)
        return
    
    else
        if (folder.size==0)
            removeFolder;
        else
            for loop in contents of folder:
                sort(content)
*/

