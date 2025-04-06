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
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
