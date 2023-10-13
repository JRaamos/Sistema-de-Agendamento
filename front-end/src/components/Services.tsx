import React, { useContext, useEffect, useState } from "react";
import "../styles/services.css";
import AgendamentosContext from "../context/AgendamentosContext";
import services from "../utils/services.json";

function Services() {
  const {
    servicesSelected,
    setServicesSelected,
    setDisableButton,
    setIsServicesSelected,
  }: any = useContext(AgendamentosContext);
  const renderServices = (target: any) => {
    if (target.checked) {
      setServicesSelected([...servicesSelected, target.value]);
      setDisableButton(false);
      setIsServicesSelected(true);
    } else {
      setServicesSelected(
        servicesSelected.filter((service: any) => service !== target.value)
      );
    }

    if (!target.checked && servicesSelected.length === 1) {
      setDisableButton(true);
      setIsServicesSelected(false);
    }
  };
  return (
    <div>
      <div>
        {services.map((service: any) => (
          <div key={service.id}>
            <div className="container-services">
              <label className="label-services">
                <input
                  className="input-services"
                  type="checkbox"
                  name="services"
                  onChange={({ target }) => {
                    renderServices(target);
                  }}
                  value={service.services}
                />
                {service.services}
              </label>
            </div>
            <div className="container-reference">
              {service.services === "Pigmentação" ? (
                <p className="pigmentacao">{`A partir de R$ ${service.price}`}</p>
              ) : (
                <p>{`R$ ${service.price},00`}</p>
              )}
              {service.duration !== null ? (
                <p>{`${service.duration}min`}</p>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Services;
