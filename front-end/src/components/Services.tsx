import React, { useEffect, useState } from "react";
import fetchAPi from "../utils/fetchApi";
import "../styles/services.css";
function Services() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const response = await fetchAPi();
      setServices(response);
    };
    fecthData();
  }, []);
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
                  value={service.services}
                />
                {service.services}
              </label>
            </div>
            <div className="container-reference">
              {service.services === "Pigmentação" ? (
                <p className="pigmentacao">{`A partir de R$ ${service.price}`}</p>
              ) : (
                <p>{`R$ ${service.price}`}</p>
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
