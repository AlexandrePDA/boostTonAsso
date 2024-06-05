"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventCalendar from "./AddEventCalendar";
import { CalendarCheck2, RotateCw } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchEventCalendar } from "@/lib/fetchQuery";
import SheetViewEventCalendar from "./SheetViewEventCalendar";

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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dateCliked, setDateCliked] = useState<string>("");
  const [showSheetViewEventCalendar, setShowSheetViewEventCalendar] = useState<boolean>(false)

  const { data, isLoading, isError, error } = useQuery(
    "eventCalendar",
    fetchEventCalendar
  );

  if (isLoading)
    return (
      <div className="flex w-2/3 h-screen items-center justify-center">
        <RotateCw className="size-8 animate-spin text-gray-500" />
      </div>
    );
  if (isError) return <div>Erreur lors du chargement des adhérents</div>;

  const handleDateClick = (arg: any) => {
    setDateCliked(arg.dateStr);
    setIsOpen(true);
  };

  const handleEventClick = (arg: any) => {
    setShowSheetViewEventCalendar(true)
    setSelectedEvent(arg.event);
  };

  return (
    <div className=" p-4 border rounded-xl w-2/3">
      <div className="flex items-center gap-2">
        <CalendarCheck2 />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Planning des tâches
        </h2>
      </div>
      <SheetViewEventCalendar open={showSheetViewEventCalendar}/>
      {selectedEvent && (
        <div>
          <p>Titre: {(selectedEvent as any).title}</p>
          <p>Début: {String((selectedEvent as any).start)}</p>
          <p>Fin: {String((selectedEvent as any).end)}</p>
          <p>ID de l'événement: {(selectedEvent as any).id || "N/A"}</p>
        </div>
      )}

      <div className="flex justify-end my-4">
        <AddEventCalendar date={dateCliked} open={isOpen} />
      </div>
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
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: false,
        }}
        events={data}
        nowIndicator={true}
        firstDay={1}
        dayHeaderFormat={{ weekday: "long" }}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
}
