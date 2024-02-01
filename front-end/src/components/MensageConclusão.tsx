import React, { useContext, useEffect, useState } from "react";
import messagensInicials from "../utils/mensagens";
import AgendamentosContext from "../context/AgendamentosContext";

function MensageConclusão() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [istext, setIsText] = useState(false);
  const [isAgradecimento, setIsAgradecimento] = useState(false);
  const {
    values,
    agendamentos,
    setPhoneBottom,
    setIsMyAgendamentos,
    handleLocalStorange,
    setCanRender,
    containerRef,
  } = useContext(AgendamentosContext);

  const mensagem = messagensInicials.mensagem08(
    values.services.map((service: any) => service).join(", "),
    agendamentos
  );
  useEffect(() => {
    const textoArray1 = messagensInicials.mensagem07.split("");
    const textoArray2 = mensagem.split("");
    const textoArray3 = messagensInicials.mensagem09.split("");
    let currentText1 = "";
    let currentText2 = "";
    let currentText3 = "";

    handleLocalStorange();
    setIsMyAgendamentos(true);
    const typingInterval = setInterval(() => {
      if (textoArray1.length > 0) {
        currentText1 += textoArray1.shift();
        setText(currentText1);
        setPhoneBottom(true);
      } else if (textoArray2.length > 0) {
        setIsText(true);
        currentText2 += textoArray2.shift();
        setText2(currentText2);
      } else if (textoArray3.length > 0) {
        setIsAgradecimento(true);
        currentText3 += textoArray3.shift();
        setText3(currentText3);
      } else {
        setCanRender(true);
        clearInterval(typingInterval);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, [values.phone]);
  
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    }
  }, [text, text2, text3]);
  return (
    <div>
      <section className="section-mensagem">
        <p>{text}</p>
      </section>
      {istext && (
        <section className="section-mensagem">
          <p>{text2}</p>
        </section>
      )}
      {isAgradecimento && (
        <section className="section-mensagem">
          <p>{text3}</p>
        </section>
      )}
    </div>
  );
}

export default MensageConclusão;
