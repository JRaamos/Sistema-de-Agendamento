import React from 'react'
import { Agendamentos, AgendamentosCardProps } from '../types/MeusAgendamentos';


function AgendamentosCard({agendamentos, setCancelar, setHour, setDate}: AgendamentosCardProps) {
  return (
    <div>
          {agendamentos.map((agendamento: Agendamentos, index) => (
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
                    {agendamento.services.map((service, index) => (
                      <p key={index}>{service}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="money">R$ {`${agendamento.price},00`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
  )
}
export default AgendamentosCard