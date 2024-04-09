const mongoose = require("mongoose");
const connection = mongoose.connect('mongodb://127.0.0.1:27017/todo');
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
},{versionKey:false});

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = {connection,TodoModel};