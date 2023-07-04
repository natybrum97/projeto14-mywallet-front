import { useState } from "react";
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";

export default function SignInPage() {

  const navigate = useNavigate();

  const [login, setLogin] = useState({});
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function enviarInfos(e) {
    e.preventDefault();

    const obj = {
        email: email,
        password: senha
    }


    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

    const promise = axios.post(url, obj);

    promise.then(resposta => {
       
        setLogin(resposta.data);
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
        <input placeholder="E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Senha" type="password" autoComplete="new-password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button>Entrar</button>

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
