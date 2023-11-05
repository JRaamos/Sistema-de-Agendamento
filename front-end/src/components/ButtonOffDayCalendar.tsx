import React, { useState } from "react";

function ButtonOffDayCalendar({
  handleAddOffDay,
  confirmSelectedOffDays,
  cancelOffDay,
  cancellationCandidate,
  selectedOffDays,
}: any) {
  const [typeOffDay, setTypeOffDay] = useState(false);
  return (
    <>
      {Object.keys(selectedOffDays).length > 0 ? (
        <div className="off-day-selection">
          <p>Selecione o tipo de folga</p>
          <button
            onClick={() => {
              handleAddOffDay("morning");
              setTypeOffDay(true);
            }}
          >
            Folgar pela manhã
          </button>
          <button
            onClick={() => {
              handleAddOffDay("afternoon");
              setTypeOffDay(true);
            }}
          >
            Folgar pela tarde
          </button>
          <button
            onClick={() => {
              handleAddOffDay("full-day");
              setTypeOffDay(true);
            }}
          >
            Folgar o dia todo
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="confirm-off-days">
        {Object.keys(selectedOffDays).length > 0 && typeOffDay && (
          <button
            onClick={() => {
              confirmSelectedOffDays();
            }}
          >
            Confirmar Dias de Folga ?
          </button>
        )}
        {cancellationCandidate && Object.keys(selectedOffDays).length === 0 && (
          <button onClick={cancelOffDay}>Cancelar Folga Selecionada</button>
        )}
      </div>
    </>
  );
}

export default ButtonOffDayCalendar;
