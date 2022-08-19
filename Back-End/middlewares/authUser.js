const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const authUser = (req, res, next) => {
    try {
        //Get the Token.
        const { authorization } = req.headers;

        //If ther isn't token, send an error.
        if (!authorization) {
            throw generateError('The autorization header is missing', 401);
        }

        let token;

        try {
            //Try to get the token info
            token = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError('Incorrect Token', 401);
        }

        //add a new property to the request.
        req.idUser = token.id;

        //Next controller
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authUser;
