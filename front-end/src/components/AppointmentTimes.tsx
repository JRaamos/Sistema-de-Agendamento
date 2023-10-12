import React, { FC, useContext, useEffect, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import services from "../utils/services.json";
import "../styles/appointmentTimes.css";
import AgendamentosContext from "../context/AgendamentosContext";

type AppointmentTimesProps = {
  selectedDate: Date | null;
  selectedServices: string[];
};
const AppointmentTimes: FC<AppointmentTimesProps> = ({
  selectedDate,
  selectedServices,
}) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const { values, setValues, setDisableButton } =
    useContext(AgendamentosContext);

  // Função para calcular os horários disponíveis com base nos serviços selecionados e na data
  const calculateAvailableTimes = () => {
    if (selectedServices.length === 0 || !selectedDate) {
      setAvailableTimes([]);
      return;
    }

    const dayOfWeek = dayjs(selectedDate).format("dddd");

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

    const startTime = moment(selectedDate).set({ hour: 7, minute: 0 });
    let endTime = moment(selectedDate).set({ hour: 20, minute: 0 });

    if (dayOfWeek === "Saturday") {
      endTime = moment(selectedDate).set({ hour: 19, minute: 0 });
    }

    const times: string[] = [];

    if (dayOfWeek !== "Tuesday") {
      while (startTime.isBefore(endTime)) {
        const currentTime = startTime.format("HH:mm");
        times.push(currentTime);
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
  const handleTimeClick = (time: string) => {
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
    <div className="hours-contain">
      <p className="section-mensagem">Horários disponíveis:</p>
      <div className="hours">
        {availableTimes.map((time) => (
          <div key={time}>
            <button
              onClick={() => {
                handleTimeClick(time);
                setDisableButton(false);
              }}
              className={
                !selectedTimes.includes(time) ? "button-time" : "hours-selected"
              }
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
