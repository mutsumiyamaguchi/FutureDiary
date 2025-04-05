const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let items = [];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const { id, name } = req.body;
  items.push({ id, name });
  res.json({ message: '登録完了', items });
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  items = items.map(item => item.id === id ? { id, name } : item);
  res.json({ message: '更新完了', items });
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id !== id);
  res.json({ message: '削除完了', items });
});

// サーバー起動
app.listen(PORT,"localhost", () => {
  console.log(`Server running on port ${PORT}`);
});
