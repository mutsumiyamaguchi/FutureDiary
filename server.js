const express = require("express");
const cors = require("cors");
const path = require("path");
const admin = require('firebase-admin');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const ServiceAccount = require('./ServiceAccount.json');
const { time } = require("console");

const app = express();
const PORT = process.env.PORT || 5000;
admin.initializeApp({ credential: admin.credential.cert(ServiceAccount) });

const db = getFirestore();
const ScheduleCollection = 'schedules'  // スケジュールDB名

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let items = [];

/**スケジュールを取得するAPI*/
app.get('/items', async (req, res) => {
  items = [];
  try {
    const itemsRef = db.collection(ScheduleCollection);
    const snapshot = await itemsRef.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return res.json([]);
    }

    snapshot.forEach(doc => {
      console.log("GET " + doc.id, '=>', doc.data());
      items.push(doc.data());
    });

    res.json(items);
  } catch (error) {
    console.error('Error getting documents:', error);
    res.status(500).json({ error: 'データ取得に失敗しました' });
  }
});

/**スケジュールを追加するAPI*/
app.post('/items', async (req, res) => {
  // データの定義場所
  const { id, day,IsCheacked,name,Time } = req.body;
  items.push(req.body);
  try {
    // sv-SEロケールはYYYY-MM-DD形式の日付文字列を戻す
    const day = new Date().toLocaleDateString('sv-SE')
    const docRef = db.collection(ScheduleCollection).doc(id);
    const setAda = await docRef.set({
      id  : id,
      date: day,
      IsCheacked: day,
      name: name,
      Time : Time,
    });
    res.json({ message: '登録完了', items });
    console.log("登録しました " + name)
  } catch (error) {
    console.error('Error registering documents:', error);
    res.status(500).json({ error: '六に失敗しました' });
  }
});

/**スケジュールを更新するAPI*/
app.put('/items/:id', async (req, res) => {
  // データの定義場所
  const { id } = req.params;
  const { day,IsCheacked,name,Time } = req.body;  // データ本体
  try {
    // sv-SEロケールはYYYY-MM-DD形式の日付文字列を戻す
    const day = new Date().toLocaleDateString('sv-SE')
    const docRef = db.collection(ScheduleCollection).doc(id);
    const setAda = await docRef.set({
      id  : id,
      date: day,
      IsCheacked: day,
      name: name,
      Time : Time,
    });
    res.json({ message: '更新完了', items });
    console.log("更新しました " + name)
  } catch (error) {
    console.error('Error updating documents:', error);
    res.status(500).json({ error: '更新に失敗しました' });
  }
});

/**スケジュールを削除するAPI*/
app.delete('/items/:id', async (req, res) => {
  items = [];
  try {
    const { id } = req.params;
    await db.collection(ScheduleCollection).doc(id).delete();
    res.json({ message: '削除完了', items });
    console.log("削除しました " + id)
  } catch (error) {
    console.error('Error removeing documents:', error);
    res.status(500).json({ error: '削除に失敗しました' });
  }
});

// サーバー起動
app.listen(PORT,"localhost", () => {
  console.log(`Server running on port ${PORT}`);
});
