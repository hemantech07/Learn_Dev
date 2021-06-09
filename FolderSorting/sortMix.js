let fs = require('fs');
let extensions = require('./extensions');

let mixFolderPath = './mixFolder';

let contents = fs.readdirSync(mixFolderPath);

for (let i in contents) {
    let ext = contents[i].split('.')[1];
    
    if (ext==undefined) {
        // If Folder
        let folder = contents[i];
        let folderPath = mixFolderPath+'/'+folder;
        let files = fs.readdirSync(folderPath);

        // Loop through all files in folder
        for (let idx in  files) {
            sortFile(files[idx], folderPath);
        }

        // Delete empty folder asynchronously. ***PROBLEM***
        if (files.length==0) {
            fs.rmdirSync(folderPath);
        }
    } else {
        // If File
        sortFile(contents[i]);
    }
}

function sortFile(file, fileFolderPath) {
    let ext = file.split('.')[1];
    let folderName = getFolderName(ext);

    let folderPath = mixFolderPath+'/'+folderName;
    if (!fs.existsSync(folderPath)) {
        // Folder doesnt exist. Creates a new folder
        fs.mkdirSync(folderPath);
    }
    // Now Move file front mixFolder to its respective folder.
    // We cant move directly in fs.
    // First Copy the file into target directory(folderName).
    // Then Delete the original file from mixFolder.

    // Copy
    let sourceFilePath = mixFolderPath+'/'+file;
    if (fileFolderPath!=undefined)
        sourceFilePath = fileFolderPath+'/'+file;
    let destFilePath = folderPath+'/'+file;
    fs.copyFileSync(sourceFilePath, destFilePath);

    // Delete
    fs.unlinkSync(sourceFilePath);
}

function getFolderName(ext) {
    for (let key in extensions) {
        if (extensions[key].includes(ext)) {
            return key;
        }
    }
}