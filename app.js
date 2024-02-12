const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const todosRouter = require("./todo-crud");

app.use(express.json());

// Database setup
require("./db");

// Routes
app.get("/todos", todosRouter.getAllTodos);
app.get("/todos/:id", todosRouter.getTodoById);
app.post("/todos", todosRouter.createTodo);
app.put("/todos/:id", todosRouter.updateTodo);
app.delete("/todos/:id", todosRouter.deleteTodo);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
