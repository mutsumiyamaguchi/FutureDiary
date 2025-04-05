import { useEffect, useState } from 'react'
import './App.css';
import Calendar from './components/Calendar';
import DayDetailModal from './components/DayDetailModal';

function App() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateClick = (date) => {
    setSelectedDate(date); // ← カレンダーから渡された日付
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddSchedule = async (e) => {
    alert(`${selectedDate} の予定を追加しました！`);
    fetchItems();
      // ここで送信
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Date.now().toString(), name }),
      });
    console.log("送信済")
    setSelectedDate(null);
  };

  const API_URL = 'http://localhost:5000/items';

  // 送信するデータを定義する変数
  const fetchItems = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 入力しデータをAPIに送信する関数
  const handleSubmit = async (e) => {
    //e.preventDefault();   // 送信後にリロードしない処理
    if (editId) {
      // ここで編集
      await fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      setEditId(null);
    } else {
      // ここで取得
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Date.now().toString(), name }),
      });
    }
    setName('');
    fetchItems();
    console.log("送信済")
  };

  // 削除ボタンのハンドラ
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchItems();
    window.location.reload()
  };

  // 編集ボタンのハンドラ
  const handleEdit = (item) => {
    setName(item.name);
    setEditId(item.id);
  };

  return (
    // ReactとFirebaseを連携させたサンプル
    <>
       <div style={{ padding: '2rem' }}>
      <h1>React + Vite × Node.js API</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前を入力"
          required
        />
        <button type="submit">{editId ? '更新' : '登録'}</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleEdit(item)}>編集</button>
            <button onClick={() => handleDelete(item.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
      <Calendar onDateClick={handleDateClick} />

      {selectedDate && (
        <DayDetailModal
          date={selectedDate}
          onClose={handleCloseModal}
          onAdd={handleAddSchedule}
        />
      )}
    </>
  );
}

export default App;
