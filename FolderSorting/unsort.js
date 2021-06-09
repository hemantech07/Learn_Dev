let fs = require('fs');
let extensions = require('./extensions.js');

let testFolderPath = './testFolder';

let contents = fs.readdirSync(testFolderPath);

for (let i=0; i<contents.length; i++) {
    let folder = contents[i];
    let folderPath = testFolderPath+'/'+folder;
    // console.log(folderPath);

    if (fs.lstatSync(folderPath).isDirectory()) {
        // If Folder Exist
        // Copy all data to TestFolder
        // Delete Folder

        // Copy
        let files = fs.readdirSync(folderPath);
        for (let i in files) {
            let sourcePath = folderPath+'/'+files[i];
            let destPath = testFolderPath+'/'+files[i];
            fs.copyFileSync(sourcePath, destPath);
            // Deleting copied File
            fs.unlinkSync(sourcePath);
        }

        // Delete Empty directory
        fs.rmdirSync(folderPath);
    }
}
console.log("Files Unsorted");