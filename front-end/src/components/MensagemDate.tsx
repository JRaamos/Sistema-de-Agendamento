import React, { useContext, useEffect, useState } from "react";
import messagensInicials from "../utils/mensagens";
import AgendamentosContext from "../context/AgendamentosContext";

function MensagemDate() {
  const [text, setText] = useState("");
  const { setIsDates, containerRef } = useContext(AgendamentosContext);

  useEffect(() => {
    const textoArray1 = messagensInicials.mensagem05.split("");
    let currentText1 = "";

    const typingInterval = setInterval(() => {
      if (textoArray1.length > 0) {
        currentText1 += textoArray1.shift();
        setText(currentText1);
      } else {
        clearInterval(typingInterval);
        setIsDates(true);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, []);
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    }
  }, [text]);
  return <div>{<p>{text}</p>}</div>;
}
export default MensagemDate;
