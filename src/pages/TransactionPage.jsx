import styled from "styled-components"
import { LoginContext } from "../Contexts/LoginContext";
import { useContext, useState } from "react";
import axios from "axios";

export default function TransactionsPage(props) {

  const { login } = useContext(LoginContext);
  const token = login.token;

  const { tela1, setTela1, tela2, setTela2 } = props

  const [valor, setValor] = useState('');
  const [description, setDescription] = useState('');

  function enviarInfos(e) {
    e.preventDefault();

    const obj = {valor, description}

    const config = {
      headers: {
          Authorization: "Bearer " + token
      }
  }
  console.log(config)

    let url = "";

    if (tela1) {
      url = "http://localhost:5000/nova-transacao/entrada";
    }

    if (tela2) {
      url = "http://localhost:5000/nova-transacao/saida";
    }

    const promise = axios.post(url, obj);

    promise.then(resposta => {

      if (tela1) {
        alert('Entrada registrada com sucesso!');
      }
  
      if (tela2) {
        alert('Saída registrada com sucesso!');
      }
      navigate("/home");

    });

    promise.catch(erro => {

      alert('Ocorreu um problema ao salvar os seus dados, tente novamente!');
      console.log(erro.response.data);
    });

  }

  return (
    <TransactionsContainer>

      {tela1 && (

        <h1>Nova entrada</h1>

      )}

      {tela2 && (

        <h1>Nova saída</h1>

      )}

      <form onSubmit={enviarInfos}>

        <input placeholder="Valor" type="text" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} required />
        <input placeholder="Descrição" type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        {tela1 && (

          <button type="submit">Salvar entrada</button>

        )}

        {tela2 && (

          <button type="submit">Salvar saída</button>

        )}

      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
