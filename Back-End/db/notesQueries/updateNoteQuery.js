const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const updateNoteQuery = async (idUser, idNotes, title, text, category) => {
    let connection;
    try {
        connection = await getConnection();

        //Check that it is the same user in DB.
        const [correctUser] = await connection.query(
            'SELECT id FROM notes WHERE idUser = ? AND id ?',
            [idUser, idNotes]
        );

        if (!correctUser[0]) {
            throw generateError('You arent the user of this note', 403);
        }

        //Updating note.
        await connection.query(
            'UPDATE notes SET title = ?, text = ?, category = ? WHERE id = ?',
            [title, text, category, idNotes]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateNoteQuery;
