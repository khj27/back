import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: '서버에서 문제가 발생했습니다.' });
});

app.listen(PORT, () => {
  console.log(`Todo backend running on http://localhost:${PORT}`);
});
