const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());  // To allow cross-origin requests from the frontend

mongoose.connect('mongodb://127.0.0.1:27017/todo_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const todoSchema = new mongoose.Schema({
  whatToDo: { type: String, required: true },
  whenToDo: { type: Date, required: true },
  note: { type: String },
});

const Todo = mongoose.model('Todo', todoSchema);

app.post('/todos', async (req, res) => {
  const { whatToDo, whenToDo, note } = req.body;
  try {
    const newTodo = new Todo({
      whatToDo,
      whenToDo,
      note
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ToDo' });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ToDos' });
  }
});

export default app;


