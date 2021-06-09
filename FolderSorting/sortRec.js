let fs = require('fs');
let extensions = require('./extensions');

let mixFolderPath = './mixFolder';
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
        for loop in contents of folder:
                sort(content)
        if (folder.size==0)
            removeFolder;
*/

for (let i in contents) {
    sortRec(contents[i], mixFolderPath);
}

function sortRec(item, path) {
    path = path+'/'+item;
    if (!fs.lstatSync(path).isDirectory()) {
        // If File
        sortFile(item, path);
        return;
    }

    // If Folder
    let folderContent = fs.readdirSync(path);
    
    for (let idx in folderContent) {
        sortRec(folderContent[idx], path);
    }

    // If folder empty, remove it.
    if (fs.readdirSync(path).length==0) {
        fs.rmdirSync(path);
        return;
    }
}

function sortFile(file, sourcePath) {
    let ext = file.split('.')[1];
    let folderName = getFolderName(ext);

    let folderPath = mixFolderPath+'/'+folderName;
    if (!fs.existsSync(folderPath)) {
        // Folder doesnt exist. Creates a new folder
        fs.mkdirSync(folderPath);
    }

    let destPath = folderPath +'/' + file;
    // If file is not present in right directory.
    if (!fs.existsSync(destPath)) {
        fs.copyFileSync(sourcePath, destPath);
        fs.unlinkSync(sourcePath);
    }
}

function getFolderName(ext) {
    for (let key in extensions) {
        if (extensions[key].includes(ext)) {
            return key;
        }
    }
}