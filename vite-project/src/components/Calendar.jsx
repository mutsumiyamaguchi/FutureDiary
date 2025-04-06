import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Counter from "./Counter";
import jaLocale from "@fullcalendar/core/locales/ja";
import { useEffect, useState } from "react";

export default function Calendar({ onDateClick }) {
  const handleDateClick = (arg) => {
    // arg.dateStr: "2025-04-05" のような形式
    if (onDateClick) {
      onDateClick(arg.dateStr);
      console.log(arg);
    }
  };

  const API_URL = "http://localhost:5000/items";

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log(data);
        // ここでカレンダー用イベントに変換
        const formattedEvents = data.map((item) => {
          const event = {
            title: item.name,
            start: `${item.date}T${item.Time}`, // ← ここで start 作ってる
          };
          return event;
        });
        setEvents(formattedEvents);
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    };

    fetchList();
  }, []);

  return (
    <>
      <Counter />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={jaLocale}
        dateClick={handleDateClick}
        events={events}
        // eventContent={(arg) => {
        //     return (
        //       <div>
        //         <i>{arg.timeText}~</i><br />
        //         <b>{arg.event.title}</b>
        //       </div>
        //     );
        //   }}
        eventTimeFormat={{ // ここで時間の表示形式を変更
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 24時間制にする
          }}
      />
    </>
  );
}
