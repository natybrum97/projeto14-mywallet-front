import styled from "styled-components"
import { LoginContext } from "../Contexts/LoginContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionsPagecopy() {

  const { transacao, setTransacao, isLoged } = useContext(LoginContext);
 
  isLoged();

  const navigate = useNavigate();

  let tipo = "";
  if(transacao.tipo === "entrada"){
    tipo = "entrada";
  } else {
    tipo = "saída";
  }

  function enviarInfos(e) {
    e.preventDefault();

    const obj = {
      valor: transacao.valor,
      description: transacao.description
    };
  
    const url = `${import.meta.env.VITE_API_URL}/editar-registro/${transacao.tipo}/${transacao._id}`;
  
    axios.put(url, obj)
      .then(response => {
        alert(`${tipo} atualizada com sucesso!`);
        navigate('/home');
      })
      .catch(error => {
        alert('Ocorreu um problema ao atualizar a entrada, tente novamente!');
        console.log(error.response.data);
      });

  }

  return (
    <TransactionsContainer>

      <h1>Editar {tipo}</h1>

      <form onSubmit={enviarInfos}>

        <input data-test="registry-amount-input" placeholder="Valor" type="text" id="valor" value={transacao.valor} onChange={(e) => setTransacao({ ...transacao, valor: e.target.value })} required />
        <input data-test="registry-name-input" placeholder="Descrição" type="text" id="description" value={transacao.description} onChange={(e) => setTransacao({ ...transacao, description: e.target.value })} required />

        <button data-test="registry-save" type="submit">Atualizar {tipo}</button>

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
