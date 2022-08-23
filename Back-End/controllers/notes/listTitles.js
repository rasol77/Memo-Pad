const selectAllTitlesQuery = require('../../db/notesQueries/selectAllTitleQuery');

const listTitles = async (req, res, next) => {
    try {
        const title = await selectAllTitlesQuery();

        res.send({
            status: 'ok',
            data: {
                title,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = listTitles;
