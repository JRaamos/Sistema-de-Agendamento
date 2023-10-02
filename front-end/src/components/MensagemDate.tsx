import React, { useEffect, useState } from "react";
import messagensInicials from "../utils/mensagens";
import "../styles/mensagemDate.css";

function MensagemDate() {
  const [text, setText] = useState("");

  useEffect(() => {
    const textoArray1 = messagensInicials.mensagem05.split("");
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
export default MensagemDate;
