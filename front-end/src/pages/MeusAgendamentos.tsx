import React, { useEffect, useState } from "react";
import arrow from "../images/arrow-1.svg";
import "../styles/meusAgendamentos.css";
import { useNavigate } from "react-router-dom";
import servicesJson from "../utils/services.json";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

function MeusAgendamentos() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [servicesSelected, setServicesSelected] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const values = localStorage.getItem("agendamentos");
    if (values) {
      const agendamentos = JSON.parse(values);
      const inputDate = new Date(agendamentos.date);
      const formattedDate = format(inputDate, "EEE, dd/MM/yyy", {
        locale: ptBR,
      });
      console.log(formattedDate);

      agendamentos.date = `${formattedDate} as ${agendamentos.hour}`;
      setAgendamentos([agendamentos]);
      setServicesSelected(agendamentos.services);
    }
  }, []);
  useEffect(() => {
    const priceComparacion = () => {
      const services = servicesJson.filter((service) =>
        servicesSelected.includes(service.services)
      );
      const price = services.map((service) => service.price);
      const priceTotal = price.reduce((acc, current) => acc + current, 0);
      setPrice(priceTotal);
    };
    priceComparacion();
  }, [servicesSelected]);
  return (
    <div>
      <button
        onClick={() => navigate("/agendamentos")}
        className="custom-button"
      >
        <img src={arrow} alt="arrow" className="button-image" />
      </button>
      <div>
        <h1>Meus agendamentos</h1>
        <div className="agendamentos-container">
          {agendamentos &&
            agendamentos.map((agendamento, index) => (
              <div key={index} className="agendamento-card">
                <div>
                  <p>{agendamento.date}</p>
                  <button>Cancelar</button>
                </div>
                <div>
                  <div>
                    <h3>{agendamento.name}</h3>
                    {servicesSelected &&
                      servicesSelected.map((service: any) => (
                        <p key={service} className="services-selected">
                          {service}
                        </p>
                      ))}
                  </div>
                  <div>
                    <h3>R$ {`${price},00`}</h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <p>
          <strong>Atenção!</strong> Este estabelecimento permite cancelamentos
          com no mínimo 30 min de antecedência.
        </p>
      </div>
    </div>
  );
}
export default MeusAgendamentos;
