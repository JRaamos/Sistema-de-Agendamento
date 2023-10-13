import React, { useContext, useEffect, useState } from "react";
import AgendamentosContext from "../context/AgendamentosContext";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import "../styles/formsInput.css";

function FormsInput() {
  const {
    values,
    setValues,
    setIsServices,
    setIsDate,
    setPhone,
    servicesSelected,
    setIsAgendamentos,
    setIsName,
    disableButton,
    setDisableButton,
    isPhone,
    setIsPhone,
    agendamentos,
    setAgendamentos,
    disableInput,
    isServices,
    inputValue,
    setInputValue,
    setDisableInput,
  }: any = useContext(AgendamentosContext);
  const [name, setName] = useState("");
  const rendleAgendamentos = () => {
    const inputDate = new Date(values.date);
    const formattedDate = format(inputDate, "EEE, dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    setAgendamentos(`${formattedDate} as ${values.hour}`);
  };
  useEffect(() => {
    const result = localStorage.getItem("name");
    if (result) {
      const name = JSON.parse(result);
      if (name) {
        setIsName(true);
        setValues({ ...values, name: name });
        setDisableButton(true);
        setDisableInput(true);
      }
    }
  }, []);
  const handleValues = () => {
    if (!values.name) {
      setIsName(true);
      setValues({ ...values, name: inputValue });
      setInputValue("");
      setDisableButton(true);
      setDisableInput(true);
    }

    if (values.name && !values.services) {
      setValues({ ...values, services: servicesSelected });
      setInputValue("");
      setDisableButton(true);
      setIsDate(true);
    }
    if (values.services && values.date && values.hour && !values.phone) {
      setValues({ ...values, phone: inputValue });
      setPhone(inputValue);
      setInputValue("");
      setDisableButton(true);
      setDisableInput(true);
      localStorage.setItem("name", JSON.stringify(values.name));
    }
  };

  const randonOnchange = (target: EventTarget & HTMLInputElement) => {
    setInputValue(target.value);
    if (!values.name) {
      if (target.value.length > 3) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
  };

  const handleButtonClick = () => {
    handleValues();
    setIsServices(false);

    if (values.date) {
      rendleAgendamentos();
      setDisableButton(false);
      setIsAgendamentos(true);
      setValues({ ...values, agendamentos: agendamentos });
      setIsPhone(true);
    }
  };

  return (
    <form className="rodape">
      {!disableInput && (
        <label htmlFor="input-usuario">
          <input
            className="input-usuario"
            value={inputValue}
            onChange={({ target }) => {
              randonOnchange(target);
            }}
            type={isPhone ? "number" : "text"}
            disabled={disableInput}
          />
        </label>
      )}
      <button
        className={
          isServices ? "button-usuario button-fixed" : "button-usuario"
        }
        onClick={(e) => {
          e.preventDefault();
          handleButtonClick();
        }}
        disabled={disableButton}
      >
        Enviar
      </button>
    </form>
  );
}
export default FormsInput;
