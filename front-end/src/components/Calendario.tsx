import React, { useContext, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "../styles/calendario.css";
import AgendamentosContext from "../context/AgendamentosContext";

const Calendar = () => {
  const { setSelectedDate, setValues } = useContext(AgendamentosContext);
  const calendarRef = useRef(null);
  moment.locale("pt-br");

  // Função para lidar com a seleção de datas
  const handleDateClick = (info: any) => {
    const selectedInfo: any = {
      // Data selecionada no formato "YYYY-MM-DD"
      date: info.dateStr,
    };
    setSelectedDate(selectedInfo);
    setValues({ ...setValues, date: selectedInfo.date });
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={ptBrLocale}
        headerToolbar={false}
        dateClick={handleDateClick}
        selectable={true}
      />
    </div>
  );
};

export default Calendar;
