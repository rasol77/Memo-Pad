const deleteNoteQuery = require('../../db/notesQueries/deleteNoteQuery');

const deleteNote = async (req, res, next) => {
    try {
        const { idNote } = req.params;

        await deleteNoteQuery(req.idUser, idNote);

        res.send({
            status: 'ok',
            message: 'Deleted note',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteNote;
