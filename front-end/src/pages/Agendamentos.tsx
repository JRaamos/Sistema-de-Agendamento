import React, { useState } from "react";
import messagensInicials from "../utils/mensagens";
function Agendamentos() {
  const [name, setName] = useState("");
  const [isName, setIsName] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const nameAndButton = (name: string) => {
    setName(name);
    if (name.length > 3) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };
  return (
    <div>
      <section className="section-mensagem">
        <p>{messagensInicials.mensagem01}</p>
      </section>
      <section className="section-mensagem">
        <p>{messagensInicials.mensagem02}</p>
      </section>
      {isName && (
        <section className="section-mensagem-usuario">
          <p>{name}</p>
        </section>
      )}
      {isName && (
        <div>
          <section className="section-mensagem">
            <p>{`Seja bem vindo ${name} a Stylus Barbearia`}</p>
          </section>
          <section className="section-mensagem">
            <p>{messagensInicials.mensagem04}</p>
          </section>
        </div>
      )}
      <form>
        <label htmlFor="input-usuario">
          <input
            id="input-usuario"
            onChange={({ target }) => {
              nameAndButton(target.value);
            }}
            type="text"
          />
        </label>
        <button
          type="button"
          onClick={() => setIsName(true)}
          disabled={disableButton}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
export default Agendamentos;
