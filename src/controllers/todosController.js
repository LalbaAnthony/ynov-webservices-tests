const { todos } = require("../data/todos.mock");

exports.getAll = (req, res) => {
  res.json(todos);
};

exports.getById = (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  res.json(todo);
};

exports.create = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Missing title" });

  const newTodo = {
    id: todos.length + 1,
    title,
    done: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.title = req.body.title ?? todo.title;
  todo.done = req.body.done ?? todo.done;

  res.json(todo);
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  todos.splice(index, 1);
  res.status(204).send();
};