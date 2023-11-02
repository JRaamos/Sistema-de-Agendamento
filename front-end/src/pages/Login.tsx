import React, { useState } from "react";
import logo from "../images/logo-1.png";
import { fetchAPiLogin } from "../utils/fetchApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensage, setMensage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const verifyLogin = async () => {
    const token = await fetchAPiLogin(email, password);
    if (token.mensage.length < 25) {
      setMensage(token.mensage);
      return;
    }

    localStorage.setItem("token", token.mensage);
    navigate("/barbers");
  };

  return (
    <div>
      <section className="section-logo">
        <img src={logo} alt="logo" className="img-logo" />
      </section>
      {mensage.length > 0 && <p>{mensage}</p>}
      <form>
        <label>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={({ target }) => {
              setEmail(target.value);
              setMensage("");
            }}
            placeholder="Digite seu Email"
          />
        </label>
        <label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            required
            onChange={({ target }) => {
              setPassword(target.value);
              setMensage("");
            }}
            placeholder="Digite sua Senha"
          />
          <button
            type="button"
            aria-label={showPassword ? "Ocultar" : "Mostrar"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </label>

        <button type="button" onClick={verifyLogin}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
