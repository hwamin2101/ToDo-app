const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Todo = sequelize.define('Todo', {
    content:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
    },
    type:{
        type: DataTypes.STRING,
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});
module.exports = Todo;