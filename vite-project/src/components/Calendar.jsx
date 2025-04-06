// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
// import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

// export default function Calendar() {
//     const handleDateClick = (arg) => {
//         console.log("this is arg.dateStr",arg.dateStr)
//         alert(arg.dateStr)
//       }
//   return (
//     <FullCalendar
//       plugins={[ dayGridPlugin, interactionPlugin ]}
//       initialView="dayGridMonth"
//       dateClick={handleDateClick}
//     />
//   )
// }

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar({ onDateClick }) {
  const handleDateClick = (arg) => {
    // arg.dateStr: "2025-04-05" のような形式
    if (onDateClick) {
      onDateClick(arg.dateStr);
    }
  };

  return (
    <>
      <Counter />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
    </>
  );
}
