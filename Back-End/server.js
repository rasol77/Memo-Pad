require('dotenv').config();

const { PORT } = process.env;

const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//Requests from the browser.
app.use(cors());

//Logger morgan.
app.use(morgan('dev'));

//Body with raw format.
app.use(express.json());

//Body with form-data format.
app.use(fileUpload());

//Static directory for up files.
app.use(express.static('uploads'));

/**
 * $$$$$$$$$$$$$$$$$$
 * $$$ MIDDLEWARES $$
 * $$$$$$$$$$$$$$$$$$
 */
const authUser = require('./middlewares/authUser');

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
const {
    newNote,
    updateNote,
    getNote,
    deleteNote,
    listTitles,
} = require('./controllers/notes');

//New write note TOKEN.
app.post('/notes', authUser, newNote);

//Get only note.
app.get('/notes/:idNote', authUser, getNote);

//List titles TOKEN
app.get('/notes', authUser, listTitles);

//Update note TOKEN.
app.put('/notes/:idNote', authUser, updateNote);

//Delete note TOKEN
app.delete('/notes/:idNote', authUser, deleteNote);

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
