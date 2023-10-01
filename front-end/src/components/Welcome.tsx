import React, { useEffect, useState } from "react";
import messagensInicials from "../utils/mensagens";

function Welcome({ name, setIsServices }) {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [istext, setIsText] = useState(false);
  const mensagem = messagensInicials.mensagem03(name);

  useEffect(() => {
    const textoArray1 = mensagem.split("");
    const textoArray2 = messagensInicials.mensagem04.split("");
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
        setIsServices(true);
      }
    }, 35);
    return () => clearInterval(typingInterval);
  }, []);

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
    </div>
  );
}

export default Welcome;
