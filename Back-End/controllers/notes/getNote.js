const selectNoteByIdQuery = require('../../db/notesQueries/selectNoteByIdQuery');

const getNote = async (req, res, next) => {
    try {
        const { idNote } = req.params;

        const note = await selectNoteByIdQuery(idNote);

        res.send({
            status: 'ok',
            data: {
                note,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getNote;
