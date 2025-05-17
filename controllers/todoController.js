const todoService = require('../service/todoService');
const getAllTodo = async (req, res) => {
    try {
        const todos = await todoService.getAllTodo();
        res.status(200).json(todos);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || "An error occurred while fetching todos";
        res.status(status).json({ message });
    }
};
const getTodoByPage = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await todoService.getTodoByPage(page, limit);
        res.status(200).json(result);
    }catch (error) {
        const status = error.status || 500;
        const message = error.message || "An error occurred while fetching todos";
        res.status(status).json({ message });
    }
};

const createTodo = async (req, res) => {
    try {
        const todo = await todoService.createTodo(req.body);
        res.status(201).json(todo);
    }catch (error) {
        res.status(400).json({ message: "Error creating todo", error });
    }
};
const updateTodo = async (req, res) => {
    try{
        const todo = await todoService.updateTodo(req.params.id, req.body);
        res.status(todo.status).json(todo);
    }catch (error) {
        res.status(400).json({ message: "Error updating todo", error });
    }
};

const deleteTodo = async (req, res) => {
    try{
        const todo = await todoService.deleteTodo(req.params.id);
        res.status(todo.status).json(todo);
    }catch (error) {
        res.status(400).json({ message: "Error deleting todo", error });
    }
};

module.exports = {
    getAllTodo,
    getTodoByPage,
    createTodo,
    updateTodo,
    deleteTodo
};