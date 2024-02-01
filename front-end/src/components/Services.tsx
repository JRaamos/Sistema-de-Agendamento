import React, { useContext, useEffect, useState } from "react";
import "../styles/services.css";
import AgendamentosContext from "../context/AgendamentosContext";
import { fetchAPiGetAllServices } from "../utils/fetchApi";
import { ServiceApi } from "../types/ApiReturn";

function Services() {
  const [services, setServices] = useState<ServiceApi[]>([]);
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

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetchAPiGetAllServices()
      setServices(response);
    };
    fetchServices();
  }, []);
  return (
    <div>
      <div>
        {services.map((service: ServiceApi ) => (
          <div key={service.service}>
            <div className="container-services">
              <label className="label-services">
                <input
                  className="input-services"
                  type="checkbox"
                  name="services"
                  onChange={({ target }) => {
                    renderServices(target);
                  }}
                  value={service.service}
                />
                {service.service}
              </label>
            </div>
            <div className="container-reference">
              {service.service === "Pigmentação" ? (
                <p className="pigmentacao">{`A partir de R$ ${service.price}`}</p>
              ) : (
                <p>{`R$ ${service.price},00`}</p>
              )}
              {service.service === "Pigmentação" ? (
                ""
              ) : (
                <p>{`${service.duration}min`}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Services;
