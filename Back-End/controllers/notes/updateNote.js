const updateNoteQuery = require('../../db/notesQueries/updateNoteQuery');
const { generateError } = require('../../helpers');

const updateNote = async (req, res, next) => {
    try {
        const { title, text, category } = req.body;
        const { idNote } = req.params;

        //If the title, text and category is empty and the text is longer than 1638 characters.
        if (!title || !category || !text || text.length > 1638) {
            throw generateError(
                'Text Invalid and length exceeds 1638 characters',
                400
            );
        }

        //Update note.
        await updateNoteQuery(req.idUser, idNote, title, text, category);

        res.send({
            status: 'ok',
            message: 'Note created successfully ',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateNote;
