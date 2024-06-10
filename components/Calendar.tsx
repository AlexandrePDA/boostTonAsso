"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventCalendar from "./AddEventCalendar";
import { CalendarCheck2, RotateCw, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchEventCalendar } from "@/lib/fetchQuery";
import ShowEventCalendar from "./ShowEventCalendar";

export default function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dateCliked, setDateCliked] = useState<string>("");

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

      <div className="flex justify-end my-2">
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

      {selectedEvent && <ShowEventCalendar propsCalendar={selectedEvent} />}
    </div>
  );
}
