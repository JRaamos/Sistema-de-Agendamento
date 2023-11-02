import React, { useContext, useEffect, useState } from "react";
import AgendamentosContext from "../context/AgendamentosContext";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import "../styles/formsInput.css";
import PhoneNumberInput from "./PhoneNumberInput";
import { AgendamentosContextType } from "../types/AgendamentosProvider";
import { fetchAPi, fetchAPiGoogleEvent } from "../utils/fetchApi";

function FormsInput() {
  const {
    values,
    setValues,
    setIsServices,
    setMsgServices,
    setIsDate,
    setPhone,
    servicesSelected,
    setIsAgendamentos,
    setIsName,
    disableButton,
    setDisableButton,
    buttonWelcome,
    setIsPhone,
    agendamentos,
    setAgendamentos,
    disableInput,
    setButtonEnviar,
    buttonEnviar,
    inputValue,
    setInputValue,
    setDisableInput,
    phoneNumber,
    inputPhone,
    setInputPhone,
    containerRef,
  } = useContext<AgendamentosContextType>(AgendamentosContext);
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
  const handleValues = async () => {
    if (!values.name) {
      setIsName(true);
      setValues({ ...values, name: inputValue });
      setInputValue("");
      setDisableButton(true);
      setDisableInput(true);
    }

    if (values.name && values.services.length === 0) {
      setValues({ ...values, services: servicesSelected });
      setInputValue("");
      setDisableButton(true);
      setIsDate(true);
      setMsgServices(true);
      setButtonEnviar(false);
    }
    if (
      values.date &&
      values.hour &&
      values.phone
    ) {

      setPhone(phoneNumber);
      setInputValue("");
      setDisableButton(true);
      setInputPhone(false);
      localStorage.setItem("name", JSON.stringify(values.name));
      fetchAPi(values);
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
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    }
  }, [inputPhone]);

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
            type="text"
            disabled={disableInput}
          />
        </label>
      )}
      <div>{inputPhone && <PhoneNumberInput />}</div>
      {buttonEnviar && (
        <button
          className={
            buttonWelcome ? "button-usuario button-fixed" : "button-usuario"
          }
          onClick={(e) => {
            e.preventDefault();
            handleButtonClick();
          }}
          disabled={disableButton}
        >
          Enviar
        </button>
      )}
    </form>
  );
}
export default FormsInput;
