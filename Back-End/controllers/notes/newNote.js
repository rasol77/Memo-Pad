const newNoteQuery = require('../../db/notesQueries/newNoteQuery');

const { generateError } = require('../../helpers');

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

        //Add new note.
        await newNoteQuery(req.idUser, title, text, category);

        res.send({
            status: 'ok',
            message: 'Note created successfully ',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newNote;
