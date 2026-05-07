const todos = [];

const findTodo = (id) => todos.find((todo) => todo.id === Number(id));

export const getTodos = (req, res) => {
  res.json(todos);
};

export const addTodo = (req, res) => {
  const { text } = req.body;
  const trimmedText = typeof text === 'string' ? text.trim() : '';

  if (!trimmedText) {
    return res.status(400).json({ error: '할 일 내용을 입력해주세요.' });
  }

  const newTodo = {
    id: Date.now(),
    text: trimmedText,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.unshift(newTodo);
  res.status(201).json(newTodo);
};

export const toggleTodo = (req, res) => {
  const { id } = req.params;
  const todo = findTodo(id);

  if (!todo) {
    return res.status(404).json({ error: '해당 할 일을 찾을 수 없습니다.' });
  }

  todo.completed = !todo.completed;
  res.json(todo);
};

export const deleteTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((todo) => todo.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ error: '해당 할 일을 찾을 수 없습니다.' });
  }

  todos.splice(index, 1);
  res.status(204).send();
};
