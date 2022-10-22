const fs = require('fs');

exports.deleteFile = (filePath) => {
    fs.unlink(filePath, err => {
        if(err){
            console.log(err);
            new Error("image delete failed");
        } else{
            console.log(filePath + ' ' + 'deleted successfully');
        }  
    });

}
