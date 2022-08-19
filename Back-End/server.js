require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//
app.use(cors());

//Logger morgan.
app.use(morgan('dev'));

//
app.use(express.json());

/**
 * $$$$$$$$$$$$$$$$$$
 * $$$ MIDDLEWARES $$
 * $$$$$$$$$$$$$$$$$$
 */
const { authUser } = require('./middlewares/authUser');

/**
 * $$$$$$$$$$$$$$$$$$$$
 * $$  USER ENPOINTS $$
 * $$$$$$$$$$$$$$$$$$$$
 */

const {
    newUser,
    getUser,
    loginUser,
    getOwnUser,
} = require('./controllers/users');

//User register.
app.post('/user', newUser);

//Login user & return the token.
app.post('/login', loginUser);

//Info about a user.
app.get('/user/:idUser', getUser);

//Get own user TOKEN.
app.get('/user', authUser, getOwnUser);

/**
 * $$$$$$$$$$$$$$$$$$$$$
 * $$  NOTES ENPOINTS $$
 * $$$$$$$$$$$$$$$$$$$$$
 */

/**
 * $$$$$$$$$$$$$$$$$$$$$$$
 * $$  MIDDLEWARE ERROR $$
 * $$$$$$$$$$$$$$$$$$$$$$$
 */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/**
 * $$$$$$$$$$$$$$$$$$$$$$$$$$$
 * $$  MIDDLEWARE NOT FOUND $$
 * $$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

/**
 * $$$$$$$$$$$$$$$$$$$$$$$$
 * $$  PORT START LISTEN $$
 * $$$$$$$$$$$$$$$$$$$$$$$$
 */

app.listen(PORT, () => {
    console.log(`Server listening http://localhost:${PORT}`);
});
