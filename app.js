const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const todosRouter = require("./todo-crud");

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Database setup
require("./db");

// Routes
const apiRouter = express.Router();

// Use the '/api' prefix for all routes
app.use("/api", apiRouter);

// Define routes with the '/api' prefix
apiRouter.get("/todos", todosRouter.getAllTodos);
apiRouter.get("/todos/:id", todosRouter.getTodoById);
apiRouter.post("/todos", todosRouter.createTodo);
apiRouter.put("/todos/:id", todosRouter.updateTodo);
apiRouter.delete("/todos/:id", todosRouter.deleteTodo);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
