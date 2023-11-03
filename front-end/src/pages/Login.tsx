import React, { useState } from "react";
import logo from "../images/logo-1.png";
import { fetchAPiLogin } from "../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

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
    navigate("/barber-dashboard");
  };

  return (
    <div className="login-container">
      <section className="section-logo">
        <img src={logo} alt="logo" className="img-logo img-logo-login" />
      </section>
      <form className="form-login">
        <h1 className="title-login">Login</h1>
        <div className="message-container">
          {mensage.length > 0 && (
            <p
              className={`mensagem-erro ${mensage.length > 0 ? "active" : ""}`}
            >
              {mensage}
            </p>
          )}
        </div>
        <div>
          <div className="input-group">
            <input
              className="input-text"
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
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="input-text"
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
              className="button-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <button type="button" className="button-login" onClick={verifyLogin}>
            Entrar
          </button>
        </div>
      </form>
      <footer className="footer">
        <p>© 2023 Jonathan Febraio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
