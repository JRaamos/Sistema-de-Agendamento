import React, { useContext, useEffect, useState } from "react";
import arrow from "../images/arrow-1.svg";
import "../styles/meusAgendamentos.css";
import { useLocation, useNavigate } from "react-router-dom";
import servicesJson from "../utils/services.json";
import { parse, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import AgendamentosContext from "../context/AgendamentosContext";
import { Agendamentos } from "../types/MeusAgendamentos";
import {
  fetchAPiCancel,
  fetchAPiCancellDate,
  fetchAPiGetAll,
  fetchAPiGetId,
  fetchAPiGoogleEventDelete,
} from "../utils/fetchApi";
import AgendamentosCard from "../components/AgendamentosCard";
import { convertToMMDDYYYY, newDateConvert } from "../utils/functions";

function MeusAgendamentos() {
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

  useEffect(() => {
    const handleSchedules = async () => {
      const currentDateTime = new Date(); // Obtem a data e hora atual
      const values = localStorage.getItem("agendamentos");
      const schedulesFromDB = await fetchAPiGetAll()
      
      if (values) {
        let result = JSON.parse(values);

        // Filtra agendamentos que são antigos
        result = result.filter((agendamento: Agendamentos) => {
          const agendamentoDate = agendamento.date.split(" as ")[0]; // Assume que agendamento.date é uma string como "Seg, 12/04/2023 as 14:00"
          const agendamentoHour = agendamento.hour; // "14:00" por exemplo
          const agendamentoDateTime = new Date(
            `${agendamentoDate} ${agendamentoHour}`
          );

          return (
            schedulesFromDB.some(
              (dbAgendamento) =>
                convertToMMDDYYYY(dbAgendamento.date) === agendamentoDate &&
                dbAgendamento.hour === agendamentoHour
            ) && agendamentoDateTime >= currentDateTime
          );
        });
        localStorage.setItem("agendamentos", JSON.stringify(result));

        // Mapeia para o novo formato
        const updatedAgendamentos = result.map((agendamento: any) => {
          const inputDate = new Date(agendamento.date);
          const formattedDate = format(inputDate, "EEE, dd/MM/yyy", {
            locale: ptBR,
          });
          agendamento.date = `${formattedDate} as ${agendamento.hour}`;

          const services = servicesJson.filter((service) =>
            agendamento.services.includes(service.services)
          );
          const prices = services.map((service) => service.price);
          const total = prices.reduce((acc, current) => acc + current, 0);
          agendamento.price = total;

          return agendamento;
        });        
        setAgendamentos(updatedAgendamentos); // Atualiza o estado com os agendamentos atualizados
      }
    };
    handleSchedules();
  }, [cancelar]);

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
          navigate("/agendamentos");
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
export default MeusAgendamentos;
