const express = require("express");
const cors = require("cors");
const path = require("path");
const admin = require('firebase-admin');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const ServiceAccount = require('./ServiceAccount.json');

const app = express();
const PORT = process.env.PORT || 5000;
admin.initializeApp({ credential: admin.credential.cert(ServiceAccount) });

const db = getFirestore();
const ScheduleCollection = 'schedules'

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let items = [];

app.get('/items', async (req, res) => {
  items = [];
  try {
    const itemsRef = db.collection(ScheduleCollection);
    const snapshot = await itemsRef.get(); // ← ✅ awaitを追加

    if (snapshot.empty) {
      console.log('No matching documents.');
      return res.json([]);
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      items.push(doc.data());
    });

    res.json(items);
  } catch (error) {
    console.error('Error getting documents:', error);
    res.status(500).json({ error: 'データ取得に失敗しました' });
  }
});

app.post('/items', (req, res) => {
  const { id, name } = req.body;
  items.push({ id, name });
  // sv-SEロケールはYYYY-MM-DD形式の日付文字列を戻す
  const day = new Date().toLocaleDateString('sv-SE')
  const docRef = db.collection(ScheduleCollection).doc(id);
  const setAda = docRef.set({
    id  : id,
    date: day,
    name: name,
  });
  res.json({ message: '登録完了', items });
  console.log("投稿しました " + name)
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  items = items.map(item => item.id === id ? { id, name } : item);
  // sv-SEロケールはYYYY-MM-DD形式の日付文字列を戻す
  const day = new Date().toLocaleDateString('sv-SE')
  const docRef = db.collection(ScheduleCollection).doc(id);
  const setAda = docRef.set({
    id  : id,
    date: day,
    name: name,
  });
  res.json({ message: '更新完了', items });
  console.log("更新しました " + name)
});

app.delete('/items/:id', (req, res) => {
  items = [];
  const { id } = req.params;
  items = items.filter(item => item.id !== id);
  res.json({ message: '削除完了', items });
  db.collection(ScheduleCollection).doc(id).delete();
  console.log("削除しました " + id)
});

// サーバー起動
app.listen(PORT,"localhost", () => {
  console.log(`Server running on port ${PORT}`);
});
