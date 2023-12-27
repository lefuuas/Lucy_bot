import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./tela.css";
import Carregando from "../../components/Carregando";
import { Logincontext } from "../../context/logincontext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {tooglelogin} = useContext(Logincontext)

  const handleLogin = async () => {
    const formData = {
      usuario: email,
      senha: password,
    };

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/auth/login", formData);
      const { token } = response.data;

      if (token) {
        tooglelogin()
        localStorage.setItem("token", token);
        navigate("/edit-itens");
      }

      setLoading(false);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Erro de login:", error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? 
        <Carregando/>
      : 
        <div className="fade-in-animation-ld">
          <div className="background-image"></div>
          <div className="retangulo">
            <div className="login-title">
              <div className="container-up">
                <p className="frase">Bem vindo ao</p>
                <span className="login-text">LOGIN</span>
              </div>
              <span className="subtext">da LucyBot!</span>
            </div>

            <div className="frase2">Preencha os dados de login para acessar</div>
            <div className="linha2"></div>
            <div className="usuario">Email:</div>
            <label htmlFor="loginInfo">
              <i className="fas fa-envelope"></i>
            </label>
            <input
              type="text"
              id="loginInfo"
              name="loginInfo"
              placeholder="Digite suas informações de login"
              className="linhausuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="linha"></div>
            <div className="senha">Senha:</div>
            <label htmlFor="password">
              <i className="fas fa-key"></i>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              className="linhasenha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="login">
              Entrar
            </button>
          </div>
        </div>
      }
    </>
  );
}

export default Login;
