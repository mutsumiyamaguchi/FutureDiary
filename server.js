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
  const { date,name,month } = req.query;  // クエリパラメータから日付を取得
  items = [];
  try {
    const itemsRef = db.collection(ScheduleCollection);
    let q;
    let snapshot;
    /*名前と日付両方で絞り込んだスケジュールを取得する*/
    if(date && name)
    {
      snapshot = await itemsRef.where("date", "==", date).orderBy("name").startAt(name).endAt(name + "\uf8ff").get();
    }
    /*名前で絞り込んだスケジュールを取得する*/
    else if(name)
    {
      snapshot = await itemsRef.orderBy("name").startAt(name).endAt(name + "\uf8ff").get();
    }
    /*日付で絞り込んだスケジュールを取得する*/
    else if(date)
    {
      snapshot = await itemsRef.where("date", "==", date).get();
    }else{
      snapshot = await itemsRef.get();
    }
    if (snapshot.empty) {
      console.log('No matching documents.');
      return res.json([]);
    }

    snapshot.forEach(doc => {
      if(month)
      {
        // その月の予定を取得する
        let result = doc.get('date').split("-");
        if(month != result[1])
        {
          return;
        }
      }
      console.log("GET " + doc.id, '=>', doc.data());
      items.push(doc.data());
    });

    res.json(items);
  } catch (error) {
    console.error('Error getting documents:', error);
    res.status(500).json({ error: 'データ取得に失敗しました' });
  }
});

/**IsCheckedの状態を配列で取得するAPI*/
app.get('/items/GetIsCheckedList', async (req, res) => {
  items = [];
  IsChecked = [];
  try {
    const itemsRef = db.collection(ScheduleCollection);
    const snapshot = await itemsRef.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return res.json([]);
    }
    // 取得した全データに処理を行う
    snapshot.forEach(doc => {
      console.log("GET " + doc.id, '=>', doc.get('IsChecked'));
      items.push(doc.get('IsChecked'));
    });

    console.log(items);
    // リストを格納
    res.json(items);
  } catch (error) {
    console.error('Error getting documents:', error);
    res.status(500).json({ error: 'データ取得に失敗しました' });
  }
});

/**スケジュールを追加するAPI*/
app.post('/items', async (req, res) => {
  // データの定義場所
  const { id, date,IsChecked,name,Time } = req.body;
  items.push(req.body);
  try {
    const docRef = db.collection(ScheduleCollection).doc(id);
    const setAda = await docRef.set({
      id  : id,
      date: date,
      IsChecked: IsChecked,
      name: name,
      Time : Time,
    });
    res.json({ message: '登録完了', items });
    console.log("登録しました " + name)
  } catch (error) {
    console.error('Error registering documents:', error);
    res.status(500).json({ error: '登録に失敗しました' });
  }
});

/**スケジュールを更新するAPI*/
app.put('/items/:id', async (req, res) => {
  // データの定義場所
  const { id } = req.params;
  const { date,IsChecked,name,Time } = req.body;  // データ本体
  try {
    // sv-SEロケールはYYYY-MM-DD形式の日付文字列を戻す
    const day = new Date().toLocaleDateString('sv-SE')
    const docRef = db.collection(ScheduleCollection).doc(id);
    const setAda = await docRef.set({
      id  : id,
      date: date,
      IsChecked: IsChecked,
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
