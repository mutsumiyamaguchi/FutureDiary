import { useEffect, useState } from 'react'
import './App.css';
import TodoList from './components/TODOList';'./components/TodoList';
import Calendar from './components/Calendar';
import DayDetailModal from './components/DayDetailModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [date, setDate] = useState('');
  const [IsCheacked, setCheack] = useState(false);
  const [Time, setTime] = useState('');
  const [editId, setEditId] = useState(null);


  const handleAddSchedule = async (e) => {
    //alert(`${selectedDate}のTODOリストに${e.text} の予定を追加しました！`);
    toast.success(`${selectedDate}のTODOに「${e.text}」を追加しました！`);
    fetchItems();
      // ここで送信
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 実際に送受信するデータ
        body: JSON.stringify({ id: Date.now().toString(), date: selectedDate,IsChecked:e.isChecked,name: e.text,Time: e.time }),
      });
    console.log("送信済")
    setSelectedDate(null);
  };

  const API_URL = 'http://localhost:5000/items';

  // 送信するデータを定義する変数
  const fetchItems = async () => {
    const res = await fetch(API_URL);
    const res1 = await fetch(API_URL + '/GetIsCheckedList');
    console.log("DateFilter")
    const res2 = await fetch(`${API_URL}?date=2025-04-06`);
    let data = await res.json();
    data.sort((a, b) => {
      const dateA = a.date || "9999-99-99";
      const dateB = b.date || "9999-99-99";
      const timeA = a.Time && a.Time.match(/^\d{2}:\d{2}$/) ? a.Time : "99:99";
      const timeB = b.Time && b.Time.match(/^\d{2}:\d{2}$/) ? b.Time : "99:99";
    
      const dateCompare = dateA.localeCompare(dateB);
      if (dateCompare !== 0) return dateCompare;
    
      return timeA.localeCompare(timeB);
    });
    
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
        // 実際に送受信するデータ
        body: JSON.stringify({ name,date,IsCheacked,Time }),
      });
      setEditId(null);
    } else {
      // sv-SEロケールはYYYY-MM-DD形式の日付文字列を戻す
      const day = new Date().toLocaleDateString('sv-SE')
      // ここで取得
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 実際に送受信するデータ
        body: JSON.stringify({ id: Date.now().toString(), date: selectedDate,IsCheacked : false,name: e,Time: "--:--"}),
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
    setDate(item.date);
    setCheack(item.IsCheacked);
    setTime(item.Time);
    setEditId(item.id);
  };

  return (
    // ReactとFirebaseを連携させたサンプル
    <>
       <div style={{ padding: '2rem' }}>
      <h1>フューチャーダイアリー</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="タスク名を入力"
          required
        />
        <button type="submit">{editId ? '更新' : '登録'}</button>
      </form>
    </div>
      {/* 🔽 TODO一覧表示をコンポーネント化！ */}
      <TodoList items={items} onEdit={handleEdit} onDelete={handleDelete} />
      <Calendar onDateClick={handleDateClick} />
      <ToastContainer />
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
