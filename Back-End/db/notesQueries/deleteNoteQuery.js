const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const deleteNoteQuery = async (idUser, idNote) => {
    let connection;
    try {
        connection = await getConnection();

        const [correctUser] = await connection.query(
            'SELECT id FROM notes WHERE idUser = ? AND id = ?',
            [idUser, idNote]
        );

        if (!correctUser[0]) {
            throw generateError('You arent the user of this note', 403);
        }

        await connection.query('DELETE FROM notes WHERE id = ?', [idNote]);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
module.exports = deleteNoteQuery;
