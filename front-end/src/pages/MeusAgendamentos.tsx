import React, { useContext, useEffect, useState } from "react";
import arrow from "../images/arrow-1.svg";
import "../styles/meusAgendamentos.css";
import { useLocation, useNavigate } from "react-router-dom";
import servicesJson from "../utils/services.json";
import { parse, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import AgendamentosContext from "../context/AgendamentosContext";

function MeusAgendamentos() {
  const location = useLocation();

  const {
    setInputValue,
    setIsName,
    setText,
    setText2,
    setIsText,
    setIsDate,
    setPhone,
    setIsAgendamentos,
    setDisableInput,
    setIsServicesSelected,
    setIsDates,
    setSelectedDate,
    setIsPhone,
    setIsMyAgendamentos,
    setValues,
    setDisableButton,
    setIsServices,
    setServicesSelected,
    setPhoneNumber,
    setInputPhone,
  } = useContext(AgendamentosContext);
  const resetStates = () => {
    setInputValue("");
    setIsName(false);
    setText("");
    setText2("");
    setIsText(false);
    setIsDate(false);
    setIsPhone(false);
    setIsServices(false);
    setPhone("");
    setIsAgendamentos(false);
    setDisableInput(true);
    setIsServicesSelected(false);
    setIsDates(false);
    setSelectedDate(null);
    setIsMyAgendamentos(false);
    setValues({
      name: "",
      phone: "",
      date: "",
      hour: "",
      services: "",
    });
    setDisableButton(true);
    setServicesSelected([]);
    setPhoneNumber(null);
    setInputPhone(false);
  };

  useEffect(() => {
    resetStates();
  }, [location]);
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [serviceSelected, setServiceSelected] = useState([]);
  const [price, setPrice] = useState(0);
  const [cancelar, setCancelar] = useState(false);
  const [hour, setHour] = useState(0);
  const [date, setDate] = useState("");
  useEffect(() => {
    const values = localStorage.getItem("agendamentos");
    if (values) {
      const result = JSON.parse(values);
      const agendamentos = result.map((agendamento: any) => {
        const inputDate = new Date(agendamento.date);
        const formattedDate = format(inputDate, "EEE, dd/MM/yyy", {
          locale: ptBR,
        });
        agendamento.date = `${formattedDate} as ${agendamento.hour}`;
        setServiceSelected(agendamento.services);
        return agendamento;
      });
      setAgendamentos(agendamentos);
    }
  }, [cancelar]);

  useEffect(() => {
    const priceComparacion = () => {
      const services = servicesJson.filter((service) =>
        serviceSelected.includes(service.services)
      );
      const price = services.map((service) => service.price);
      const priceTotal = price.reduce((acc, current) => acc + current, 0);
      setPrice(priceTotal);
    };
    priceComparacion();
  }, [serviceSelected]);

  const formatDate = (date: string) => {
    const inputDate = new Date(date);
    const formattedDate = format(inputDate, "EEE, dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    return `${formattedDate} as ${hour}`;
  };

  const removeStorage = () => {
    const storage = localStorage.getItem("agendamentos");
    const dataBr = date.split(" ");
    const dataObj = parse(dataBr[1], "dd/MM/yyyy", new Date());
    const dataUS = format(dataObj, "MM/dd/yyyy");

    if (storage) {
      const agendamentos = JSON.parse(storage);

      const newAgendamentos = agendamentos.filter((agendamento) => {
        return agendamento.agendamentos !== formatDate(dataUS);
      });

      localStorage.setItem("agendamentos", JSON.stringify(newAgendamentos));
      setCancelar(false);
      setAgendamentos(newAgendamentos);
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
        <div className="agendamentos-container">
          <h2>Meus agendamentos</h2>
          <div>
            {agendamentos &&
              agendamentos.map((agendamento, index) => (
                <div key={index} className="agendamento-card">
                  <div className="header-card">
                    <p>{agendamento.date}</p>
                    <button
                      onClick={() => {
                        setHour(agendamento.hour);
                        setDate(agendamento.date);
                        setCancelar(true);
                      }}
                      className="cancelar"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div className="footer-card">
                    <div>
                      <h3>{agendamento.name}</h3>
                      <div>
                        {agendamento.services &&
                          agendamento.services.map((service, index) => (
                            <p key={index}>{service}</p>
                          ))}
                      </div>
                    </div>
                    <div>
                      <p className="money">R$ {`${price},00`}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
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
