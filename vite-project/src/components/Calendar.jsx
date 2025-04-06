import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Counter from './Counter';
import jaLocale from '@fullcalendar/core/locales/ja'
import { useEffect, useState } from 'react';

export default function Calendar({ onDateClick }) {
  const handleDateClick = (arg) => {
    // arg.dateStr: "2025-04-05" のような形式
    if (onDateClick) {
      onDateClick(arg.dateStr);
      console.log(arg)
    }
  };

  const API_URL = "http://localhost:5000/items"

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        console.log(data)
        // データをカレンダー用の形に変換する
        const formattedEvents = data.map(item => ({
          title: item.name,    // ← ここはAPIの項目に合わせてね！
          date: item.date,       // ← 日付もAPIの項目に合わせる
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    };
  
    fetchList();
  }, []);

  return (
    <>
    <Counter/>
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={jaLocale}
      dateClick={handleDateClick}
      events={events}
    />
    </>
  );
}