"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// //const newEvent = {
//               title: "event new",
//               start: "2024-06-04T10:00:00",
//               end: "2024-06-04T11:00:00",
//             };
//PRISMA
// model Calendar {
//   id         String   @id @default(cuid())
//   userId     String
//   nameEvent  String
//   startEvent DateTime
//   endEvent   DateTime
//   user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
// }

const EventsTest = [
  {
    title: "programation post instagram sur charge mentale",
    start: "2024-06-04T10:00:00",
    end: "2024-06-04T14:00:00",
  },
  {
    title: "programation post instagram sur charge mentale",
    start: "2024-06-04T15:00:00",
    end: "2024-06-04T16:00:00",
  },
  {
    title: "event 2",
    start: "2024-06-05T10:00:00",
    end: "2024-06-05T11:00:00",
  },
];

export default function Calendar() {
  const newEvent = () => {
    console.log("new event");
  };

  const handleDateClick = (arg: any) => {
    console.log(arg.dateStr);
  };

  return (
    <div className=" w-full">
      <FullCalendar
        locale="fr"
        buttonText={{
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
        }}
        titleFormat={{ year: "numeric", month: "long" }}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,today,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay addEvent",
        }}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: false,
        }}
        customButtons={{
          addEvent: {
            text: "Ajouter",
            click: () => {
              newEvent();
            },
          },
        }}
        events={EventsTest}
        nowIndicator={true}
        firstDay={1}
        dayHeaderFormat={{ weekday: "long" }}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
    </div>
  );
}
