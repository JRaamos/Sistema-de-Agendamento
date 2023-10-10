import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import services from "../utils/services.json";
import "../styles/appointmentTimes.css";
import AgendamentosContext from "../context/AgendamentosContext";
const AppointmentTimes = ({ selectedDate, selectedServices }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const { values, setValues } = useContext(AgendamentosContext);

  // Função para calcular os horários disponíveis com base nos serviços selecionados e na data
  const calculateAvailableTimes = () => {
    if (selectedServices.length === 0 || !selectedDate) {
      setAvailableTimes([]);
      return;
    }

    const dayOfWeek = dayjs(selectedDate.date).format("dddd");

    const totalDuration = selectedServices.reduce((acc, selectedService) => {
      const serviceInfo = services.find(
        (service) => service.services === selectedService
      );
      if (serviceInfo) {
        const serviceDuration = serviceInfo.duration;
        return acc + (serviceDuration || 0);
      }
      return acc;
    }, 0);

    const startTime = moment(selectedDate.date).set({ hour: 7, minute: 0 });
    let endTime = moment(selectedDate.date).set({ hour: 20, minute: 0 });

    if (dayOfWeek === "Saturday") {
      endTime = moment(selectedDate.date).set({ hour: 19, minute: 0 });
    }

    const times = [];

    if (dayOfWeek !== "Tuesday") {
      while (startTime.isBefore(endTime)) {
        const currentTime = startTime.format("HH:mm");
        if (!bookedTimes.includes(currentTime)) {
          times.push(currentTime);
        }
        startTime.add(totalDuration, "minutes");
        if (startTime.isSameOrAfter(endTime)) {
          break;
        }
      }
    }

    setAvailableTimes(times);
    if (dayOfWeek === "Tuesday" || dayOfWeek === "Sunday") {
      setAvailableTimes(["Sem horarios disponiveis"]);
    }
  };

  // Função para lidar com a seleção de horários
  const handleTimeClick = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(
        selectedTimes.filter((selectedTime) => selectedTime !== time)
      );
      setValues({ ...values, hour: "" });
    } else {
      setSelectedTimes([selectedTimes, time]);
      setValues({ ...values, hour: time });
    }
  };

  useEffect(() => {
    calculateAvailableTimes();
  }, [selectedDate, selectedServices]);

  return (
    <div>
      <h2>Horários disponíveis:</h2>
      <div className="hours">
        {availableTimes.map((time) => (
          <div key={time}>
            <button
              onClick={() => handleTimeClick(time)}
              disabled={selectedTimes.includes(time)}
              className="button-time"
            >
              {time}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentTimes;
