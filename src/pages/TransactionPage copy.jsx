import styled from "styled-components"
import { LoginContext } from "../Contexts/LoginContext";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage(props) {

  const { login, transacao, setTransacao } = useContext(LoginContext);
  const token = login;

  const navigate = useNavigate();

  const { tela1, tela2 } = props

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

    let rota = "";

    if (tela1) {

      rota = "entrada";
      
    }

    if (tela2) {

      rota = "saida";
    
    }

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${rota}`, obj,config);

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

        <h1>Editar entrada</h1>

      )}

      {tela2 && (

        <h1>Editar saída</h1>

      )}

      <form onSubmit={enviarInfos}>

        <input data-test="registry-amount-input" placeholder="Valor" type="text" id="valor" value={transacao.valor} onChange={(e) => setTransacao({ ...transacao, valor: e.target.value })} required />
        <input data-test="registry-name-input" placeholder="Descrição" type="text" id="description" value={transacao.description} onChange={(e) => setTransacao({ ...transacao, description: e.target.value })} required />


        {tela1 && (

          <button data-test="registry-save" type="submit">Atualizar entrada</button>

        )}

        {tela2 && (

          <button data-test="registry-save" type="submit">Atualizar saída</button>

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
