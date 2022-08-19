const insertUserQuery = require('../../db/userQueries/insertUserQuery');

const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
    try {
        //Get the field of body.

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw generateError('Missing parameters', 400);
        }

        //Make new user un DB and get the ID
        const idUser = await insertUserQuery(username, email, password);

        res.send({
            status: 'ok',
            message: `User with id ${idUser} created succesfull`,
        });
    } catch (error) {
        next(error);
    }
};
module.exports = newUser;
