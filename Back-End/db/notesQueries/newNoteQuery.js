const getConnection = require('../getConnection');

const newNoteQuery = async (idUser, title, text, image, category) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            'INSERT INTO notes (idUser, title, text, image,  category) VALUES (?, ?, ?, ?, ?)',
            [idUser, title, text, image, category]
        );
    } finally {
        connection.release();
    }
};

module.exports = newNoteQuery;
