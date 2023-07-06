import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');

  function enviarInfos(e) {
    e.preventDefault();

    const obj = {
      name: name,
      email: email,
      password: senha
    }

    if(senha === confirmar){

      const apiUrl = "http://localhost:5000/cadastro";

      const promise = axios.post(apiUrl, obj);
  
      promise.then(resposta => {
  
        alert('Você foi cadastrado com sucesso!')
        console.log(resposta.data);
        navigate("/");
  
      });
  
      promise.catch(erro => {
      
        console.log(erro.response.data);
        alert(erro.response.data.message || erro.response.data);
  
      });
    } else {
      alert("As senhas disponibilizadas não são iguais!")
    }

    
  }

  return (
    <SingUpContainer>
      <form onSubmit={enviarInfos}>

        <MyWalletLogo />
        <input data-test="name" placeholder="Nome" type="text" id="nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <input data-test="email" placeholder="E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input data-test="password" placeholder="Senha" type="password" autoComplete="new-password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <input data-test="conf-password" placeholder="Confirme a senha" type="password" autoComplete="new-password" id="confirmar" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>

      </form>

      <Link to='/'>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
