import React from "react";
import { Service } from "../types/ApiReturn";
import { EditeServiceProps } from "../types/Service";

function EditeService({
  whatEdit,
  editorService,
  handleChangeService,
  handleConfirmEdit,
  isError,
}: EditeServiceProps) {
  return (
    <div>
    {isError && <p>Preencha todos os campos</p>}
      {(whatEdit === "service" || whatEdit === "full") && (
        <div>
          <h2>Novo nome do serviço</h2>
          <label>
            Nome
            <input
              type="text"
              value={editorService.service}
              onChange={(e) => handleChangeService("service", e.target.value)}
            />
          </label>
          {whatEdit !== "full" && (
            <button type="button" onClick={() => handleConfirmEdit()}>
              Editar
            </button>
          )}
        </div>
      )}
      {(whatEdit === "price" || whatEdit === "full") && (
        <div>
          <h2>Novo preço do serviço</h2>
          <label>
            Preço
            <input
              type="number"
              value={editorService.price || ""}
              onChange={(e) => handleChangeService("price", +e.target.value)}
              min={0}
            />
          </label>
          {whatEdit !== "full" && (
            <button type="button" onClick={() => handleConfirmEdit()}>
              Editar
            </button>
          )}
        </div>
      )}
      {(whatEdit === "duration" || whatEdit === "full") && (
        <div>
          <h2>Nova duração do serviço</h2>
          <label>
            Duração
            <input
              type="number"
              value={editorService.duration || ""}
              onChange={(e) => handleChangeService("duration", +e.target.value)}
              min={0}
            />
          </label>
          {whatEdit !== "full" && (
            <button type="button" onClick={() => handleConfirmEdit()}>
              Editar
            </button>
          )}
        </div>
      )}
      {
        whatEdit === "full" && (
          <button type="button" onClick={() => handleConfirmEdit()}>
            Editar
          </button>
        )
      }
    </div>
  );
}
export default EditeService;
