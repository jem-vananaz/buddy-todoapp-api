const Todo = require("./models/Todo");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ deleted: false });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, deleted: false });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, deleted: false });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (req.body.title != null) {
      todo.title = req.body.title;
    }
    if (req.body.status != null) {
      todo.status = req.body.status;
    }
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, deleted: false });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.deleted = true;
    await todo.save();
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
