const bcrypt = require('bcrypt');
const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const insertUserQuery = async (username, email, password) => {
    let connection;

    try {
        connection = await getConnection();

        //Get array to users who meet the condition.
        const [users] = await connection.query(
            `SELECT id FROM users WHERE username = ? OR email = ?`,
            [username, email]
        );

        //The user this  repeat in DB
        if (users.length > 0) {
            throw generateError('The user this  exists in Data Base', 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //Make the user
        const [newUser] = await connection.query(
            `INSERT INTO users (username, email, password, createdAt) VALUES(?, ?, ?, ?)`,
            [username, email, hashedPassword, new Date()]
        );

        //Return ID of the element created
        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
