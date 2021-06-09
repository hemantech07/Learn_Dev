let fs = require('fs');
let extensions = require('./extensions');

let mixFolderPath = './mixFolder';
let contents = fs.readdirSync(mixFolderPath);

let flag = false;
for (let i in contents) {
    let folder = contents[i];
    let folderPath = mixFolderPath+'/'+folder;

    // If folder exist
    if (fs.lstatSync(folderPath).isDirectory()) {
        // Unsort -> Copy all data to MixFolder and delete folder
        unsortFolder(folderPath);
    }
}
flag = true;
// Flag is set true when all files are transferred to the root folder.
// Then Sort all files accordingly
if (flag) {
    for (let i in contents) {
        let file = contents[i];
        sortFile(file);
    }
}

function unsortFolder(folderPath) {
        // Copy
        let files = fs.readdirSync(folderPath);
        for (let i in files) {
            let sourcePath = folderPath+'/'+files[i];
            let destPath = mixFolderPath+'/'+files[i];
            fs.copyFileSync(sourcePath, destPath);
            // Deleting copied File
            fs.unlinkSync(sourcePath);
        }

        // Delete Empty directory
        fs.rmdirSync(folderPath);
}

function sortFile(file) {
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