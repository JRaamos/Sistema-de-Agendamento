import React from "react";
import { EditeServiceProps } from "../types/Service";
import "../styles/editeService.css";

function EditeService({
  whatEdit,
  editorService,
  handleChangeService,
  handleConfirmEdit,
  isError,
}: EditeServiceProps) {
  return (
    <div className="service-contain">
      {isError && <p className="error-message">Preencha todos os campos</p>}

      {(whatEdit === "service" || whatEdit === "full") && (
        <div className="edit-name">
          <h2 className="paragraph">Novo nome do serviço</h2>
          <div className="input-contain">
            <label>Digite o novo nome:</label>
            <input
              type="text"
              className="input-service"
              value={editorService.service}
              onChange={(e) => handleChangeService("service", e.target.value)}
            />
            {whatEdit !== "full" && (
              <button
                type="button"
                className="button-edit-service"
                onClick={() => handleConfirmEdit()}
              >
                Editar
              </button>
            )}
          </div>
        </div>
      )}
      {(whatEdit === "price" || whatEdit === "full") && (
        <div className="edit-name">
          <h2 className="paragraph">Novo preço do serviço</h2>
          <div className="input-contain">
            <label>Digite o novo preço:</label>
            <input
              className="input-service"
              type="number"
              value={editorService.price || ""}
              onChange={(e) => handleChangeService("price", +e.target.value)}
              min={0}
            />
            {whatEdit !== "full" && (
              <button
                type="button"
                className="button-edit-service"
                onClick={() => handleConfirmEdit()}
              >
                Editar
              </button>
            )}
          </div>
        </div>
      )}
      {(whatEdit === "duration" || whatEdit === "full") && (
        <div className="edit-name">
          <h2 className="paragraph">Nova duração do serviço</h2>
          <div className="input-contain">
          <label>Digite a nova duração:</label>
            <input
              type="number"
              className="input-service"
              value={editorService.duration || ""}
              onChange={(e) => handleChangeService("duration", +e.target.value)}
              min={0}
            />
          {whatEdit !== "full" && (
            <button
            type="button"
            className="button-edit-service"
            onClick={() => handleConfirmEdit()}
            >
              Editar
            </button>
          )}
          </div>
        </div>
      )}
      {whatEdit === "full" && (
        <button
          type="button"
          className="button-edit-service"
          onClick={() => handleConfirmEdit()}
        >
          Editar
        </button>
      )}
    </div>
  );
}
export default EditeService;
