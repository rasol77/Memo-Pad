const getConnection = require('../getConnection');

const selectAllTitlesQuery = async () => {
    let connection;

    try {
        connection = await getConnection();

        const [titles] = await connection.query(
            `
            SELECT N.id, N.title, N.createdAt 
            FROM notes N
            ORDER BY N.createdAt DESC
            `
        );
        console.log(titles);

        return titles;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = selectAllTitlesQuery;
