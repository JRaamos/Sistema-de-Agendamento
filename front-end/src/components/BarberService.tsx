import React, { useContext, useEffect, useRef, useState } from "react";
import {
  fetchAPiGetAllServices,
  fetchApiServiceUpdate,
} from "../utils/fetchApi";
import { Service } from "../types/Service";
import Loading from "./Loading";
import EditeService from "./EditeService";
import "../styles/barberService.css";
import { ServiceApi } from "../types/ApiReturn";


function BarberService() {
  const token = localStorage.getItem("token");
  const [services, setServices] = useState<ServiceApi[]>([]);
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
  const [responseMessage, setResponseMessage] = useState<string>(
    ""
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getBarberServiceByName = async (
    name: string,
    service: Partial<Service>
  ) => {
    setLoading(true);
    const response = await fetchApiServiceUpdate(name, service, token);
    setLoading(false);
    setResponseMessage(response);
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
    setServiceSelected(serviceSelected as unknown as Service);
    restoredService();
    setResponseMessage("");
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

useEffect(() => {
  if (containerRef.current) {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
}, [responseMessage, serviceSelected, editor, whatEdit]);



  return (
    <div className="service-contain" ref={containerRef}>
      <h2 className="paragraph title-service">
        Escolha o serviço que deseja editar:
      </h2>
      <div className="button-contain-service">
        {services.map(({ service }) => (
          <button
            key={service}
            value={service}
            onClick={(e) => handleSelectService(e)}
            className="button-service"
          >
            {service}
          </button>
        ))}
      </div>
      {Object.keys(serviceSelected || {}).length > 0 && (
        <div className="service-card">
          <div className="service-edit">
            <p className="text-service">
              Nome do Serviço: <strong>{serviceSelected?.service}</strong>
            </p>
            <button
              type="button"
              className="button-close"
              onClick={() => {
                setServiceSelected({} as Service);
                restoredService();
              }}
            >
              X
            </button>
          </div>
          <p>
            Duração: <strong>{serviceSelected?.duration} min</strong>
          </p>
          <p>
            Preço: <strong>{serviceSelected?.price},00 R$</strong>
          </p>
          <button
            className="button-edit"
            type="button"
            onClick={() => {
              setEditor(!editor);
              setResponseMessage("");
              setEditorConfirm(false);
              setWhatEdit("");
              setIsError(false);
            }}
          >
            Editar
          </button>
        </div>
      )}
      {editor && (
        <div className="editor-contain">
          <h2 className="paragraph ">O que voce deseja edita?</h2>
          <button
            onClick={() => setWhatEdit("service")}
            className="button-service"
          >
            Nome do serviço
          </button>
          <button
            onClick={() => setWhatEdit("price")}
            className="button-service"
          >
            Preço
          </button>
          <button
            onClick={() => setWhatEdit("duration")}
            className="button-service"
          >
            Duração
          </button>
          <button
            onClick={() => setWhatEdit("full")}
            className="button-service"
          >
            Editar tudo
          </button>
          <button
            type="button"
            onClick={() => restoredService()}
            className="button-cancel"
          >
            cancelar
          </button>
        </div>
      )}
      {editor && (
        <EditeService
          whatEdit={whatEdit}
          editorService={editorService}
          handleChangeService={handleChangeService}
          handleConfirmEdit={handleConfirmEdit}
          isError={isError}
        />
      )}
      {editorConfirm && (
        <div>
          <div className="confirm-edit-card">
            <h3>Confirmar Edição?</h3>
            <p>
              Ao confirmar, as seguintes alterações serão aplicadas ao serviço:
            </p>
            <div className="confirm-contain">
              <p className="text-margin">
                Nome do Serviço: <strong>{newService.service}</strong>
              </p>
              <p className="text-margin">
                Duração: <strong>{newService.duration} min</strong>
              </p>
              <p className="text-margin">
                Preço: <strong>{newService.price},00 R$</strong>
              </p>
            </div>
            <div>
              <button
                type="button"
                className="button-nao"
                onClick={() => setEditorConfirm(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  getBarberServiceByName(serviceSelected.service, newService);
                  setEditorConfirm(false);
                  restoredService();
                }}
                className="button-sim"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && <Loading />}
      {responseMessage && !loading && (<p className="mensage">{responseMessage}</p>)}
    </div>
  );
}
export default BarberService;
