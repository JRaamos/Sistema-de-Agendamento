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

  const [selectedDate, setSelectedDate] = useState(null); // Estado para armazenar a data selecionada

  // Função para lidar com a seleção de datas
  const handleDateClick = (info: any) => {
    const selectedInfo: any = {
      date: info.dateStr, // Data selecionada no formato "YYYY-MM-DD"
      dayName: moment(info.date).format("dddd"), // Nome do dia (ex: "segunda-feira")
      month: moment(info.date).format("MMMM"), // Nome do mês (ex: "outubro")
    };
    setSelectedDate(selectedInfo);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={ptBrLocale}
        headerToolbar={false}
        dateClick={handleDateClick} // Configurar a função de clique na data
        selectable={true} // Permitir seleção de datas
      />
    </div>
  );
};

export default Calendar;
