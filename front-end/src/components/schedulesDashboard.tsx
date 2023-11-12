import { useContext, useEffect, useState } from "react";
import AppointmentTimes from "./AppointmentTimes";
import PhoneNumberInput from "./PhoneNumberInput";
import Services from "./Services";
import AgendamentosContext from "../context/AgendamentosContext";
import { fetchAPi, fetchApiGetDayOff } from "../utils/fetchApi";
import Loading from "./Loading";
import "../styles/schendulesDashboard.css";
import arrow from "../images/arrow-1.svg";

function SchedulesDashboard() {
  const {
    values,
    phoneNumber,
    selectedDate,
    servicesSelected,
    setBarberUnavailability,
    setServicesSelected,
    isOffDaySelected,
    setIsOffDaySelected,
    selectedOffDays,
    setSelectedOffDays,
  } = useContext(AgendamentosContext);
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState(true);
  const [inputPhone, setInputPhone] = useState(false);
  const [services, setServices] = useState(false);
  const [times, setTimes] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    const handleDayOff = async () => {
      const offDays = await fetchApiGetDayOff();
      if (offDays.length > 0) {
        setBarberUnavailability(offDays);
      }
    };
    handleDayOff();
  }, [selectedDate]);

  const handleValues = async () => {
    setLoading(true);
    const data = Object.keys(selectedOffDays).map(async (date) => {
      const newValues = {
        name: name,
        phone: phoneNumber,
        hour: values.hour,
        date: date,
        services: servicesSelected,
        eventId: "",
        agendamentos: "",
      };
      const data = await fetchAPi(newValues);
      return data;
    });
    const response = await Promise.all(data);

    if (response[0].scheduleResult) {
      setLoading(false);
      setSucesso(true);
    }
  };

  const handleRestoredValues = () => {
    setName("");
    setInputName(true);
    setInputPhone(false);
    setServices(false);
    setTimes(false);
    setIsOffDaySelected(false);
    setSelectedOffDays({});
    setServicesSelected([]);
    setTimeout(() => {
      setSucesso(false);
    }, 5000);
  };
  const handlePhoneButton = () => {
    if (phoneNumber?.length === 15) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      {isOffDaySelected && (
        <div className="agendamento-contain">
          {Object.keys(selectedOffDays).length > 0 && inputName && (
            <>
              <p className="paragraph">Qual o nome do cliente: </p>
              <div className="client-contain">
                <label htmlFor="input-usuario">
                  <input
                    type="text"
                    placeholder="Nome do cliente"
                    value={name}
                    className="input-usuario input-barber"
                    onChange={({ target }) => {
                      setName(target.value);
                      if (target.value.length > 3) {
                        setDisableButton(false);
                      } else {
                        setDisableButton(true);
                      }
                    }}
                  />
                </label>
                <button
                  className="button-usuario"
                  type="button"
                  disabled={disableButton}
                  onClick={() => {
                    setInputName(false);
                    setInputPhone(true);
                  }}
                >
                  enviar
                </button>
              </div>
            </>
          )}
          {inputPhone && (
            <>
              <div className="top-agendamentos">
                <p className="paragraph paragraph-contain">
                  Qual o número do cliente:{" "}
                </p>
                <button
                  className="button-back"
                  onClick={() => {
                    setInputName(true);
                    setInputPhone(false);
                  }}
                >
                  <img src={arrow} alt="arrow" className="button-arrow" />
                </button>
              </div>
              <div className="client-contain">
                <PhoneNumberInput />
                <button
                  className="button-usuario button-enviar"
                  type="button"
                  disabled={handlePhoneButton()}
                  onClick={() => {
                    setInputPhone(false);
                    setServices(true);
                  }}
                >
                  enviar
                </button>
              </div>
            </>
          )}
          {services && (
            <>
              <div className="top-agendamentos">
                <p className="paragraph paragraph-contain">
                  Selecione o serviço que sera realizado :
                </p>
                <button
                  className="button-back"
                  onClick={() => {
                    setServices(false);
                    setInputPhone(true);
                  }}
                >
                  <img src={arrow} alt="arrow" className="button-arrow" />
                </button>
              </div>
              <div className="service-selected ">
                <div className="section-mensagem sevice-mensage">{<Services />}</div>
                <button
                  className="button-usuario button-enviar-service"
                  type="button"
                  disabled={servicesSelected.length === 0}
                  onClick={() => {
                    setServices(false);
                    setTimes(true);
                  }}
                >
                  Enviar
                </button>
              </div>
            </>
          )}
          {times && (
            <>
              <div className="top-agendamentos">
                <p className="paragraph paragraph-contain">
                  Escolha o horário para realizar o agendamento:
                </p>
                <button
                  className="button-back"
                  onClick={() => {
                    setTimes(false);
                    setServices(true);
                    setServicesSelected([]);
                  }}
                >
                  <img src={arrow} alt="arrow" className="button-arrow" />
                </button>
              </div>
              <div className="service-selected ">
                {<AppointmentTimes />}
                <button
                  className="button-usuario"
                  type="button"
                  disabled={values.hour === ""}
                  onClick={() => {
                    handleValues();
                    handleRestoredValues();
                  }}
                >
                  enviar
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {loading && <Loading />}
      <div>
        {!loading && sucesso && (
          <div className="fade-in">
            <p className="paragraph">Agendamento realizado com sucesso!</p>
          </div>
        )}
      </div>
    </>
  );
}
export default SchedulesDashboard;
