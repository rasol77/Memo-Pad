const newNoteQuery = require('../../db/notesQueries/newNoteQuery');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

const { generateError, createPathIfNotExists } = require('../../helpers');

const newNote = async (req, res, next) => {
    try {
        const { title, text, category } = req.body;

        //If the title, text and category is empty and the text is longer than 1638 characters.
        if (!title || !category || !text || text.length > 1638) {
            throw generateError(
                'Text Invalid and length exceeds 1638 characters',
                400
            );
        }

        //save the image.
        let imgName;

        //if the image exists we save it.
        if (req.files && req.files.image) {
            //Make absolute path  to the download directory.
            const uploadsDir = path.join(__dirname, '../../uploads');

            //Make de directory.
            await createPathIfNotExists(uploadsDir);

            //We process the image and we convert into object type Sharp.
            const SharpImg = sharp(req.files.image.data);

            //resize the image in 500px to width
            SharpImg.resize(500);

            //Generate a unique name for the image.
            imgName = `${nanoid(21)}.jpg`;

            //Generate the path absolute to image.
            const imgPath = path.join(uploadsDir, imgName);

            //Save the image into the directory.
            await SharpImg.toFile(imgPath);
        }

        //Add new note.
        await newNoteQuery(req.idUser, title, text, imgName, category);

        res.send({
            status: 'ok',
            message: 'Note created successfully ',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newNote;
