import React, { useEffect, useState } from "react";
import "../styles/buttonOffDayCalendar.css";
import Loading from "./Loading";
import { format, parse } from "date-fns";
import { da } from "date-fns/locale";

function ButtonOffDayCalendar({
  handleAddOffDay,
  confirmSelectedOffDays,
  cancelOffDay,
  cancellationCandidate,
  selectedOffDays,
  typeOffDay,
  setTypeOffDay,
  typeOffDaySelected,
  setTypeOffDaySelected,
  confirmOffDay,
  selectedOffDay,
  deleteOffDay,
  loading,
}: any) {
  const [isOffDaySelected, setIsOffDaySelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    function convertDateFormat() {
      if (Object.keys(selectedOffDay).length > 0) {
        // Separa a string de data por traço em vez de barras
        const [month, day, year] = selectedOffDay[0].selectedDate.split("/"); // Desestruturação para pegar ano, mês e dia

        setSelectedDate(`${day}/${month}/${year}`); // Reorganiza no formato DD/MM/YYYY
      }
      if (cancellationCandidate && Object.keys(selectedOffDays).length === 0) {
        const [month, day, year] = cancellationCandidate.split("/"); // Desestruturação para pegar ano, mês e dia
        setSelectedDate(`${day}/${month}/${year}`); // Reorganiza no formato DD/MM/YYYY
      }
    }
    convertDateFormat();
  }, [selectedOffDay, cancellationCandidate]);

  return (
    <div className="off-day-contain fade-in">
      {Object.keys(selectedOffDays).length > 0 ? (
        <div className="off-day-selection">
          <p className="paragraph">Selecione o tipo de folga</p>
          <div className="button-OffDay">
            <button
              className={
                typeOffDaySelected === "morning"
                  ? "button-calendar button-typed-off-day actived fade-button1"
                  : "button-calendar button-typed-off-day fade-button1"
              }
              onClick={() => {
                if (typeOffDaySelected === "morning") {
                  setTypeOffDaySelected("");
                } else {
                  setTypeOffDaySelected("morning");
                }
                handleAddOffDay("morning");
                setTypeOffDay(true);
                setIsOffDaySelected(true);
              }}
            >
              Folgar pela manhã
            </button>
            <button
              className={
                typeOffDaySelected === "afternoon"
                  ? "button-calendar button-typed-off-day actived fade-button2"
                  : "button-calendar button-typed-off-day fade-button2"
              }
              onClick={() => {
                if (typeOffDaySelected === "afternoon") {
                  setTypeOffDaySelected("");
                } else {
                  setTypeOffDaySelected("afternoon");
                }
                handleAddOffDay("afternoon");
                setTypeOffDay(true);
              }}
            >
              Folgar pela tarde
            </button>
            <button
              className={
                typeOffDaySelected === "full-day"
                  ? "button-calendar button-typed-off-day actived fade-button3"
                  : "button-calendar button-typed-off-day fade-button3"
              }
              onClick={() => {
                if (typeOffDaySelected === "full-day") {
                  setTypeOffDaySelected("");
                } else {
                  setTypeOffDaySelected("full-day");
                }
                handleAddOffDay("full-day");
                setTypeOffDay(true);
                setIsOffDaySelected(true);
              }}
            >
              Folgar o dia todo
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {isOffDaySelected && Object.keys(selectedOffDay).length > 0 && (
        <div>
          <p className="paragraph fade-in">
            Deseja confirmar a folga do dia: {selectedDate}
          </p>
        </div>
      )}

      <div className="confirm-off-days fade-in">
        {Object.keys(selectedOffDays).length > 0 &&
          isOffDaySelected &&
          typeOffDay &&
          typeOffDaySelected && (
            <button
              className="button-confirm-off-day"
              onClick={() => {
                confirmSelectedOffDays();
              }}
            >
              Confirmar Dia de Folga ?
            </button>
          )}

        {cancellationCandidate &&
          Object.keys(selectedOffDays).length === 0 &&
          confirmOffDay && (
            <div>
              <div className="cancel-option fade-in">
                <p className="paragraph ">
                  Deseja cancelar a folga do dia: {selectedDate} 
                </p>
              </div>
              <button
                className="button-confirm-off-day fade-in"
                onClick={cancelOffDay}
              >
                Cancelar Folga Selecionada?
              </button>
            </div>
          )}
      </div>
      <div className="loadin-contain">
        {loading && <Loading />}
        {!loading && deleteOffDay && (
          <p className="paragraph fade-in">{deleteOffDay}</p>
        )}
      </div>
    </div>
  );
}

export default ButtonOffDayCalendar;
