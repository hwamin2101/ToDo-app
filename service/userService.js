const User = require("../models/UserModel")

const getAllUsers = async () => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] }
    });
    return users;
}

module.exports = {
    getAllUsers,
}