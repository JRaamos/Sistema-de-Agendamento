import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "../styles/calendario.css";
const Calendar = () => {
  const calendarRef = useRef(null);
  moment.locale("pt-br");

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={ptBrLocale}
        headerToolbar={false}
      />
    </div>
  );
};

export default Calendar;
