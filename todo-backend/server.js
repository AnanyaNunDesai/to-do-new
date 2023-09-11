// const express = require("express");
// const bodyParser = require("body-parser");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// const app = express();
// const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());


// In-memory storage for tasks
let tasks = [];

// RESTful API endpoints

// Get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/api/tasks", (req, res) => {
  const { text } = req.body;
  if (text) {
    const newTask = { id: Date.now(), text };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ error: "Task text is required." });
  }
});

// Delete a task by ID
app.delete("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
