import React, { useContext, useEffect, useState } from "react";
import arrow from "../images/arrow-1.svg";
import "../styles/miSchedules.css";
import { useLocation, useNavigate } from "react-router-dom";
// import servicesJson from "../utils/services.json";
import { parse, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import AgendamentosContext from "../context/AgendamentosContext";
import { Agendamentos } from "../types/MeusAgendamentos";
import {
  fetchAPiCancel,
  fetchAPiGetAllServices,
  fetchAPiGetId,
  fetchAPiGoogleEventDelete,
} from "../utils/fetchApi";
import AgendamentosCard from "../components/AgendamentosCard";
import { ServiceApi } from "../types/ApiReturn";

function MiSchedules() {
  const location = useLocation();
  
  const { resetStates } = useContext(AgendamentosContext);
  
  useEffect(() => {
    resetStates();
  }, [location]);
  
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState<Agendamentos[]>([]);
  const [cancelar, setCancelar] = useState(false);
  const [hour, setHour] = useState<string | number>(0);
  const [date, setDate] = useState<string>("");
  const [servicesJson, setServicesJson] = useState<ServiceApi[]>([]);
  
  useEffect(() => {
    const values = handleSchedulesOld();
 const fetchServices = async () => {
   const services = await fetchAPiGetAllServices();
   if (values) {
     handleUpdateSchedules(values, services);
    }
  };
  fetchServices();
  }, [cancelar]);


  // Remove agendamentos antigos
  const handleSchedulesOld = () => {
    const currentDateTime = new Date();
    const values = localStorage.getItem("agendamentos");
    if (values) {
      const result = JSON.parse(values);
      const newSchedule = result.filter((agendamento: Agendamentos) => {
        const schedulingDateTime = new Date(
          `${agendamento.date} ${agendamento.hour}`
        );
        return schedulingDateTime > currentDateTime;
      });
      localStorage.setItem("agendamentos", JSON.stringify(newSchedule));
      return newSchedule;
    } else {
      return [];
    }
  } 
  // Atualiza agendamentos colocando o preço e a data formatada para exibição no card
  const handleUpdateSchedules = (schedules: Agendamentos[], servicesJson: ServiceApi[]) => {
    const updatedAgendamentos = schedules.map((agendamento: Agendamentos) => {
      const inputDate = new Date(agendamento.date);

      const formattedDate = format(inputDate, "EEE, dd/MM/yyy", {
        locale: ptBR,
      });
      agendamento.date = `${formattedDate} as ${agendamento.hour}`;

      const services = servicesJson.filter((service) =>
        agendamento.services.includes(service.service)
      );

      const prices = services.map((service) => service.price);
      console.log(prices);

      const total = prices.reduce((acc, current) => acc + current, 0);
      console.log(total);

      agendamento.price = total;

      console.log(agendamento);

      return agendamento;
    });
    setAgendamentos(updatedAgendamentos);
  };


  const formatDate = (date: string) => {
    const inputDate = new Date(date);
    const formattedDate = format(inputDate, "EEE, dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    return `${formattedDate} as ${hour}`;
  };

  const removeStorage = async () => {
    const storage = localStorage.getItem("agendamentos");
    const dataBr = date.split(" ");
    const dataObj = parse(dataBr[1], "dd/MM/yyyy", new Date());
    const dataUS = format(dataObj, "MM/dd/yyyy");
    const dataYear = format(dataObj, "yyyy-MM-dd");

    if (storage) {
      const storageAgendamentos = JSON.parse(storage);
      const newAgendamentos = storageAgendamentos.filter(
        (agendamento: Agendamentos): boolean => {
          return agendamento.agendamentos !== formatDate(dataUS);
        }
      );

      localStorage.setItem("agendamentos", JSON.stringify(newAgendamentos));
      setCancelar(false);
      setAgendamentos(newAgendamentos);
      fetchAPiCancel(dataYear, hour);
      const eventId = await fetchAPiGetId(dataYear, hour);
      fetchAPiGoogleEventDelete(eventId.eventId);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          resetStates();
          navigate("/schedules");
        }}
        className="custom-button"
      >
        <img src={arrow} alt="arrow" className="button-image" />
      </button>
      <div className="agendamentos-container">
        <h2>Meus agendamentos</h2>
        <div>
          <AgendamentosCard
            agendamentos={agendamentos}
            setCancelar={setCancelar}
            setHour={setHour}
            setDate={setDate}
          />
        </div>
      </div>
      <div className="atencion-contain">
        <div className="atention">
          <p>
            <strong>Atenção!</strong> Este estabelecimento <br></br>permite
            cancelamentos com no<br></br> mínimo 30 min de antecedência.
          </p>
        </div>
      </div>
      {cancelar && (
        <div>
          <div className="cancelar-card">
            <h3>Deseja cancelar este horário?</h3>
            <p>
              Ao confirmar, este horário poderá ser preenchido por outro
              agendamento.
            </p>
            <div>
              <button onClick={() => setCancelar(false)} className="button-nao">
                NÃO
              </button>
              <button onClick={removeStorage} className="button-sim">
                SIM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MiSchedules;
