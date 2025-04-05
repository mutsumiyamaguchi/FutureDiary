const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// サーバー起動
app.listen(PORT,"localhost", () => {
  console.log(`Server running on port ${PORT}`);
});
