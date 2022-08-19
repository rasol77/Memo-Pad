const selectUserByIdQuery = require('../../db/userQueries/selectUserByIdQuery');

const getOwnUser = async (req, res, next) => {
    try {
        const user = await selectUserByIdQuery(req.idUser);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getOwnUser;
