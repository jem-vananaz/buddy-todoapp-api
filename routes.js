const express = require("express");
const apiRouter = express.Router();
const todosRouter = require("./todoCRUD");
const { authenticateToken } = require("./middlewares/authenticateToken");

// Apply middleware to routes that require authentication
apiRouter.use("/todos", authenticateToken);
apiRouter.use("/complete-todos", authenticateToken);

// Define routes
apiRouter.get("/todos", todosRouter.getAllTodos);
apiRouter.get("/todos/:id", todosRouter.getTodoById);
apiRouter.post("/todos", todosRouter.createTodo);
apiRouter.put("/todos/:id", todosRouter.updateTodo);
apiRouter.delete("/todos/:id", todosRouter.deleteTodo);
apiRouter.put("/complete-todos", todosRouter.completeMultiTodos);

module.exports = function (expressApp) {
  expressApp.use("/api", apiRouter);
};
