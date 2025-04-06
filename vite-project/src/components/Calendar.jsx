import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Counter from './Counter';
import jaLocale from '@fullcalendar/core/locales/ja'

export default function Calendar({ onDateClick }) {
  const handleDateClick = (arg) => {
    // arg.dateStr: "2025-04-05" のような形式
    if (onDateClick) {
      onDateClick(arg.dateStr);
    }
  };

  return (
    <>
    <Counter/>
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={jaLocale}
      dateClick={handleDateClick}
    />
    </>
  );
}