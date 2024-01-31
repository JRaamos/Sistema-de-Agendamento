import React, { useEffect, useState } from "react";
import {
  fetchAPiGetAllServices,
  fetchApiServiceUpdate,
} from "../utils/fetchApi";
import { Service } from "../types/Service";
import Loading from "./Loading";
import EditeService from "./EditeService";

function BarberPriceService() {
  const token = localStorage.getItem("token");
  const [services, setServices] = useState<Service[]>([]);
  const [serviceSelected, setServiceSelected] = useState<Service>(
    {} as Service
  );
  const [editor, setEditor] = useState<boolean>(false);
  const [whatEdit, setWhatEdit] = useState<string>("");
  const [editorService, setEditorService] = useState<Service>({
    service: "",
    duration: 0,
    price: 0,
  } as Service);
  const [newService, setNewService] = useState<Partial<Service>>({} as Service);

  const [editorConfirm, setEditorConfirm] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");

  const getBarberServiceByName = async (
    name: string,
    service: Partial<Service>
  ) => {
    setLoading(true);
    const response = await fetchApiServiceUpdate(name, service, token);
    setLoading(false);
    setResponseMessage(response);
    setInterval(() => {
      setResponseMessage("");
    }, 4000);

    setServiceSelected({} as Service);
  };

  const restoredService = () => {
    setEditor(false);
    setEditorConfirm(false);
    setEditorService({
      service: "",
      duration: 0,
      price: 0,
    } as Service);
    setWhatEdit("");
    setIsError(false);
  };
  const handleSelectService = (e: any) => {
    e.preventDefault();
    const service = e.target.value;
    const serviceSelected = services.find((item) => item.service === service);
    setServiceSelected(serviceSelected as Service);
    restoredService();
  };

  const handleChangeService = (key: string, value: string | number) => {
    setEditorService({ ...editorService, [key]: value });
  };

  const handleConfirmEdit = () => {
    if (
      editorService.service === "" &&
      editorService.duration === 0 &&
      editorService.price === 0
    ) {
      setIsError(true);
      return;
    }
    setIsError(false);

    setNewService({
      ...newService,
      service:
        editorService.service !== ""
          ? editorService.service
          : serviceSelected?.service,
      duration:
        editorService.duration !== 0
          ? editorService.duration
          : serviceSelected?.duration,
      price:
        editorService.price !== 0
          ? editorService.price
          : serviceSelected?.price,
    });
    setEditorConfirm(true);
  };
  useEffect(() => {
    const getAllServices = async () => {
      const response = await fetchAPiGetAllServices();
      setServices(response);
    };
    getAllServices();
  }, [responseMessage]);

  return (
    <div>
      <h2>Escolha o serviço que deseja editar</h2>
      <div>
        {services.map(({ service }) => (
          <button
            key={service}
            value={service}
            onClick={(e) => handleSelectService(e)}
          >
            {service}
          </button>
        ))}
      </div>
      {Object.keys(serviceSelected || {}).length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => {
              setServiceSelected({} as Service);
              restoredService();
            }}
          >
            X
          </button>
          <p>
            Nome do Serviço: <strong>{serviceSelected?.service}</strong>
          </p>
          <p>
            Duração: <strong>{serviceSelected?.duration} min</strong>
          </p>
          <p>
            Preço: <strong>{serviceSelected?.price},00 R$</strong>
          </p>
          <button type="button" onClick={() => {
            setEditor(!editor)
            setResponseMessage("")
            setEditorConfirm(false)
             setWhatEdit("");
             setIsError(false);
          }
          }>
            Editar
          </button>
        </div>
      )}
      {editor && (
        <div>
          <h2>O que voce deseja edita?</h2>
          <button onClick={() => setWhatEdit("service")}>
            Nome do serviço
          </button>
          <button onClick={() => setWhatEdit("price")}>Preço</button>
          <button onClick={() => setWhatEdit("duration")}>Duração</button>
          <button onClick={() => setWhatEdit("full")}>Editar tudo</button>
          <button type="button" onClick={() => restoredService()}>
            cancelar
          </button>
        </div>
      )}
     { editor && <div>
        <EditeService
          whatEdit={whatEdit}
          editorService={editorService}
          handleChangeService={handleChangeService}
          handleConfirmEdit={handleConfirmEdit}
          isError={isError}
        />
      </div>}
      {editorConfirm && (
        <div>
          <div className="confirm-edit-card">
            <h3>Confirmar Edição?</h3>
            <div>
              <p>
                Ao confirmar, as seguintes alterações serão aplicadas ao
                serviço:
              </p>
              <p>
                Nome do Serviço: <strong>{newService.service}</strong>
              </p>
              <p>
                Duração: <strong>{newService.duration} min</strong>
              </p>
              <p>
                Preço: <strong>{newService.price},00 R$</strong>
              </p>
            </div>
            <div>
              <button type="button" onClick={() => setEditorConfirm(false)}>
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  getBarberServiceByName(serviceSelected.service, newService);
                  setEditorConfirm(false);
                  restoredService();

                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && <Loading />}
      {responseMessage && !loading && <p>{responseMessage}</p>}
    </div>
  );
}
export default BarberPriceService;
