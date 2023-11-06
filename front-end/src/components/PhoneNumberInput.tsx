import React, { ChangeEvent, useContext, useState } from "react";
import MaskedInput from "react-text-mask";
import AgendamentosContext from "../context/AgendamentosContext";

function PhoneNumberInput() {
  const { phoneNumber, setPhoneNumber, setDisableButton, values, setValues } =
    useContext(AgendamentosContext);
  const phoneMask = [
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, phone: e.target.value });
    setPhoneNumber(e.target.value);
    if (e.target.value.length > 14) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  return (
    <div>
      <label htmlFor="phoneNumber"></label>
      <MaskedInput
        id="phoneNumber"
        className="input-usuario msg-bottom "
        mask={phoneMask}
        placeholder="Digite o numero de telefone"
        guide={false}
        showMask
        value={phoneNumber}
        onChange={handleChange}
      />
    </div>
  );
}

export default PhoneNumberInput;
