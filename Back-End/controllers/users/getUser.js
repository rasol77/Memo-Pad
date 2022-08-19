const selectUserByIdQuery = require('../../db/userQueries/selectUserByIdQuery');

const getUser = async (req, res, next) => {
    try {
        //Get the ID of User.
        const { idUser } = req.params;

        //Get the info from user.
        const user = await selectUserByIdQuery(idUser);

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

module.exports = getUser;
