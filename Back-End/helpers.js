const fs = require('fs/promises');
const path = require('path');

const generateError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

const createPathIfNotExists = async (path) => {
    try {
        //Access the directory.
        await fs.access(path);
    } catch {
        //We dont have access to directory give an error.
        //If so make the directory.
        await fs.mkdir(path);
    }
};

const deletePhoto = async (photoName) => {
    try {
        //Make the absolute path.
        const photoPath = path.join(__dirname, 'uploads', photoName);

        //Delete photo from HD.
        await fs.unlink(photoPath);
    } catch {
        throw new Error('Error the  photo delete from server');
    }
};

module.exports = {
    generateError,
    createPathIfNotExists,
    deletePhoto,
};
