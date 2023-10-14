import React, { useContext, useEffect } from "react";
import AgendamentosContext from "../context/AgendamentosContext";
import messagensInicials from "../utils/mensagens";

function Introduction() {
  const {
    values,
    text,
    istext,
    setIsText,
    text2,
    setText2,
    setText,
    isName,
    setDisableInput,
    setButtonEnviar,
    setButtonWelcome,
  }: any = useContext(AgendamentosContext);

  useEffect(() => {
    const textoArray1 = messagensInicials.mensagem01.split("");
    const textoArray2 = messagensInicials.mensagem02.split("");
    let currentText1 = "";
    let currentText2 = "";

    const typingInterval = setInterval(() => {
      if (textoArray1.length > 0) {
        currentText1 += textoArray1.shift();
        setText(currentText1);
      } else if (textoArray2.length > 0) {
        setIsText(true);
        currentText2 += textoArray2.shift();
        setText2(currentText2);
      } else {
        clearInterval(typingInterval);
        setDisableInput(false);
        setButtonEnviar(true);
        setButtonWelcome(false);
      }
    }, 30);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div>
      <section className="section-mensagem">
        <div>
          <p className="digitando">{text}</p>
        </div>
      </section>
      {istext && (
        <section className="section-mensagem">
          <p>{text2}</p>
        </section>
      )}
      {isName && (
        <section className="section-mensagem-usuario">
          <section className="section-name">
            <p>{values.name}</p>
          </section>
        </section>
      )}
    </div>
  );
}
export default Introduction;
