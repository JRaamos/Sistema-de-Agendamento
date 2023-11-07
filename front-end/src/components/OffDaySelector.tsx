import React from "react";

const OffDaySelector = ({ confirmOffDays, isRangeSelected }: any) => {
  return (
    <div className="confirm-off-days">
      <button onClick={confirmOffDays} disabled={!isRangeSelected}>
        Confirmar Dias de Folga
      </button>
    </div>
  );
};

export default OffDaySelector;
