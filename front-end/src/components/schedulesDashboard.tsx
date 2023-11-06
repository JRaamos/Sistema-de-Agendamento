import { useContext, useEffect, useState } from "react";
import AppointmentTimes from "./AppointmentTimes";
import PhoneNumberInput from "./PhoneNumberInput";
import Services from "./Services";
import AgendamentosContext from "../context/AgendamentosContext";
import { fetchAPi, fetchApiGetDayOff } from "../utils/fetchApi";
import Loading from "./Loading";

function SchedulesDashboard({
  isOffDaySelected,
  setIsOffDaySelected,
  selectedOffDays,
  setSelectedOffDays,
}) {
  const {
    values,
    phoneNumber,
    selectedDate,
    servicesSelected,
    setBarberUnavailability,
    setServicesSelected,
  } = useContext(AgendamentosContext);
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState(true);
  const [inputPhone, setInputPhone] = useState(false);
  const [services, setServices] = useState(false);
  const [times, setTimes] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

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
  };

  return (
    <>
      {isOffDaySelected && (
        <div>
          {Object.keys(selectedOffDays).length > 0 && inputName && (
            <>
              <p>Qual o nome do cliente: </p>
              <input
                type="text"
                placeholder="Nome do cliente"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
              <button
                className="button-enviar"
                type="button"
                onClick={() => {
                  setInputName(false);
                  setInputPhone(true);
                }}
              >
                enviar
              </button>
            </>
          )}
          {inputPhone && (
            <>
              <p>Qual o número do cliente: </p>
              <PhoneNumberInput />
              <button
                className="button-enviar"
                type="button"
                onClick={() => {
                  setInputPhone(false);
                  setServices(true);
                }}
              >
                enviar
              </button>
            </>
          )}
          {services && (
            <>
              <p>Selecione o serviço que sera realizado: </p>
              {<Services />}
              <button
                className="button-enviar"
                type="button"
                onClick={() => {
                  setServices(false);
                  setTimes(true);
                }}
              >
                Enviar
              </button>
            </>
          )}
          {times && (
            <>
              <p>Escolha o horário para realizar o agendamento: </p>
              {<AppointmentTimes />}
              <button
                className="button-enviar"
                type="button"
                onClick={() => {
                  handleValues();
                  handleRestoredValues();
                }}
              >
                enviar
              </button>
            </>
          )}
        </div>
      )}

      {
      loading &&
       <Loading />
      }
          <div>
            {!loading && sucesso && (
              <div className="sucesso">
                <p>Agendamento realizado com sucesso!</p>
              </div>
            )}
          </div>
    </>
  );
}
export default SchedulesDashboard;
