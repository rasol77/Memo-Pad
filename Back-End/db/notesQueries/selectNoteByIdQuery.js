const getConnection = require('../getConnection');

const selectNoteByIdQuery = async (idNote) => {
    let connection;
    try {
        connection = await getConnection();

        const [notes] = await connection.query(
            `
            SELECT N.id, N.idUser, U.email, U.username, N.title, N.text, N.Category, N.createdAt
            FROM notes N
            LEFT JOIN users U
            ON N.idUser = U.id
            WHERE U.id = ?
            `,
            [idNote]
        );
        return notes[0];
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = selectNoteByIdQuery;
