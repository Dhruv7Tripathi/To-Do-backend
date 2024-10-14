const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// import { conf igDotenv } from "dotenv";
import connectDB from "./config/db";
import User from "../models/User";
import Todo from "../frontend/src/pages/Todo";

const app = express();
app.use(express.jason());
app.use(cors({
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use('/todos', Todo);
app.use('/auth', User);

mongoose.connect('mongodb://127.0.0.1:27017/todo_app')

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});