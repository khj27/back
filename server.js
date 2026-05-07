import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://front-8xpw.onrender.com"
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("Checklist API Server is running");
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "할 일을 입력하세요." });
  }

  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.patch("/api/todos/:id/toggle", (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ message: "할 일을 찾을 수 없습니다." });
  }

  todo.completed = !todo.completed;

  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const exists = todos.some((item) => item.id === id);

  if (!exists) {
    return res.status(404).json({ message: "할 일을 찾을 수 없습니다." });
  }

  todos = todos.filter((item) => item.id !== id);

  res.json({ message: "삭제 완료" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});