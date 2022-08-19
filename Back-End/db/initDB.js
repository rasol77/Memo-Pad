const getConnection = require('./getConnection');

async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log('Delete tables... ');

        await connection.query('DROP TABLE IF EXISTS notes');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('Tables created... ');

        await connection.query(`
        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(30) UNIQUE NOT NULL,
            email VARCHAR(111) UNIQUE NOT NULL,
            password VARCHAR(80)  NOT NULL,
            createdAt TIMESTAMP NOT NULL
        )
    `);

        await connection.query(`
        CREATE TABLE notes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(id),
            title VARCHAR(80) NOT NULL,
            text VARCHAR(1638) NOT NULL,
            image VARCHAR(100),
            category VARCHAR(50), 
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
           
            
        )
    `);

        console.log('CREATED TABLES!!!');
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();

        //Close the process
        process.exit();
    }
}

//Call the function
main();
