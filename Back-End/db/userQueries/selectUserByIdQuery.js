const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectUserByIdQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id, username, email, createdAt FROM users WHERE id = ?`,
            [idUser]
        );

        //If there are no users with this id we send an error.
        if (users.length < 1) {
            throw generateError('User not found', 404);
        }

        //Make destructuring in the properties of user.
        const { id, username, email, createdAt } = users[0];

        //Basic info
        const userInfo = {
            id,
            username,
            createdAt,
        };

        //If were the propierty, we add more info.
        if (idUser === users[0].id) {
            userInfo.email = email;
        }

        //Return the user in the array position 0.
        return userInfo;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdQuery;
