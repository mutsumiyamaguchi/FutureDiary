import { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import DayDetailModal from './components/DayDetailModal';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date); // ← カレンダーから渡された日付
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  const handleAddSchedule = () => {
    alert(`${selectedDate} の予定を追加しました！`);
    setSelectedDate(null);
  };

  return (
    <>
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
