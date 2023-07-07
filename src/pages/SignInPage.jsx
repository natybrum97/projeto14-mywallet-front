import { useState } from "react";
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";
import { LoginContext } from "../Contexts/LoginContext";
import { useContext } from "react";

export default function SignInPage() {

  const { login, setLogin, setTela3, setUser } = useContext(LoginContext);
    console.log(login, "aqui");

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function enviarInfos(e) {
    e.preventDefault();

    const obj = {
      email: email,
      password: senha
    }


    const url = "";

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/`, obj);

    promise.then(resposta => {

      setLogin(resposta.data.token);
      setUser(resposta.data.nome);
      setTela3(true);
      console.log(resposta.data, "lista");
      navigate("/home");

    });

    promise.catch(erro => {

      alert('Usuário e/ou senha inválidos!');
      console.log(erro.response.data);
    });

  }

  return (
    <SingInContainer>

      <form onSubmit={enviarInfos}>

        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input data-test="password" placeholder="Senha" type="password" autoComplete="new-password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button data-test="sign-in-submit" type="submit">Entrar</button>

      </form>

      <Link to='/cadastro'>
        Primeira vez? Cadastre-se!
      </Link>

    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
