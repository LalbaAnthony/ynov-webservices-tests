const express = require("express");
const todosRoutes = require("./routes/todos");

const app = express();
app.use(express.json());
app.use("/todos", todosRoutes);

module.exports = app;