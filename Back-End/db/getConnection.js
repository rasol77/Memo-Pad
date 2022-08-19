require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

//Connection of pool.
let pool;

const getConnection = async () => {
    try {
        //Create connection group.

        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        return await pool.getConnection();
    } catch {
        throw new Error('Data Base not found');
    }
};

module.exports = getConnection;
