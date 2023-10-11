import React, { useContext, useEffect, useState } from "react";
import AgendamentosContext from "../context/AgendamentosContext";
import messagensInicials from "../utils/mensagens";

function MensagemPhone() {
  const [text, setText] = useState("");
  const { isPhone, setIsPhone } = useContext(AgendamentosContext);

  useEffect(() => {
    const textoArray1 = messagensInicials.mensagem06.split("");
    let currentText1 = "";

    const typingInterval = setInterval(() => {
      if (textoArray1.length > 0) {
        currentText1 += textoArray1.shift();
        setText(currentText1);
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, []);

  return <div className="container-msg-date">{<p>{text}</p>}</div>;
}

export default MensagemPhone;
