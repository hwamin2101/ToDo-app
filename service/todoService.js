const Todo = require('../models/TodoModel');

const getAllTodo = async () => {
    return await Todo.findAll();
};

const getTodoByPage = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return await Todo.findAndCountAll({offset, limit});
};
const createTodo = async (data) => {
    return await Todo.create(data);
};

const updateTodo = async (id, data) => {
    const todo = await Todo.findByPk(id);
    if (!todo) {
        return { status: 404, message: "Todo not found" };
    }
    await todo.update(data);
    return { status: 200, message: "Todo updated successfully", data: todo };
};
const deleteTodo = async (id) => {
    const todo = await Todo.findByPk(id);
    if (!todo) {
        return { status: 404, message: "Todo not found" };
    }
    await todo.destroy();
    return { status: 200, message: "Todo deleted successfully" };
};
module.exports = {
    getAllTodo,
    getTodoByPage,
    createTodo,
    updateTodo,
    deleteTodo
};