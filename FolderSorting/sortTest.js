let fs = require('fs');
let extensions = require('./extensions.js');

let testFolderPath  = './testFolder';

// Function which give contents of a directory.
let contents = fs.readdirSync(testFolderPath);
// console.log(contents);

// Loop through the content and calling sort() for each file.
for (let i=0; i<contents.length; i++) {
    let file = contents[i];
    sortFile(file);
}

// This function sorts the file in their respective folder.
function sortFile(file) {
    let ext = file.split('.')[1];
    let folderName = getFolderName(ext);
    
    // Making folderPath from folderName
    let folderPath = testFolderPath +'/'+ folderName;
    if (!fs.existsSync(folderPath)) {
        // Folder doesnt exist. Creates a new folder
        fs.mkdirSync(folderPath);
    }
    // Now Move file front testFolder to its respective folder.
    // We cant move directly in fs.
    // First Copy the file into target directory(folderName).
    // Then Delete the original file from testFolder.

    // Copy
    let sourceFilePath = testFolderPath+'/'+file;
    let destFilePath = folderPath+'/'+file;
    fs.copyFileSync(sourceFilePath, destFilePath);

    // Delete
    fs.unlinkSync(sourceFilePath);
}

// This function returns the folderName for extension passed, if extension exists in extensions.
function getFolderName(ext) {
    for (let key in extensions) {
        let folderName;
        if (extensions[key].includes(ext)) {
            folderName=key;
            return folderName;
        }
    }
}