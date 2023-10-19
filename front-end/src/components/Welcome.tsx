import React, { useContext, useEffect, useRef, useState } from "react";
import messagensInicials from "../utils/mensagens";
import AgendamentosContext from "../context/AgendamentosContext";

function Welcome() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [istext, setIsText] = useState(false);
  const {
    values,
    setIsServices,
    setButtonEnviar,
    setButtonWelcome,
    isServices,
  } = useContext(AgendamentosContext);
  const mensagem = messagensInicials.mensagem03(values.name);
  const name: any = localStorage.getItem("name");
  const mensagem2 = messagensInicials.mensagem10(JSON.parse(name));

  useEffect(() => {
    const textoArray1 = JSON.parse(name)
      ? mensagem2.split("")
      : mensagem.split("");
    const textoArray2 = messagensInicials.mensagem04.split("");
    let currentText1 = "";
    let currentText2 = "";
    setButtonEnviar(false);

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
        setIsServices(true);
        setButtonEnviar(true);
        setButtonWelcome(true);
      }
    }, 35);
    return () => clearInterval(typingInterval);
  }, []);



  return (
    <div>
      <section
        className={
          JSON.parse(name) ? "section-mensagem msg-top" : "section-mensagem"
        }
      >
        <p>{text}</p>
      </section>
      {istext && (
        <section className="section-mensagem">
          <p>{text2}</p>
        </section>
      )}
    </div>
  );
}

export default Welcome;
