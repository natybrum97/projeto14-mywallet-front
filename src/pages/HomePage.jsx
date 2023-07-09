import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { LoginContext } from "../Contexts/LoginContext"
import axios from "axios"

export default function HomePage(props) {

  const { login, listadeTransacoes, setListadeTransacoes, tela3, user } = useContext(LoginContext);
  const token = login;

  const { setTela1, setTela2 } = props

  const navigate = useNavigate();

  console.log(tela3, listadeTransacoes.length, listadeTransacoes);

  const arrayInvertido = listadeTransacoes.map((objeto, index) => listadeTransacoes[listadeTransacoes.length - 1 - index]);

  let totalEntradas = 0;
  let totalSaidas = 0;

  listadeTransacoes.forEach(objeto => {
    if (objeto.tipo === "entrada") {
      totalEntradas += parseFloat(objeto.valor);
    } else if (objeto.tipo === "saida") {
      totalSaidas += parseFloat(objeto.valor);
    }
  });

  const saldo = totalEntradas - totalSaidas;
  const saldoFinal = (totalEntradas - totalSaidas).toFixed(2).replace(".", ",");


  useEffect(() => {

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    const promise = axios.get(`${import.meta.env.VITE_API_URL}/home`, config);

    promise.then((resposta) => {

      setListadeTransacoes(resposta.data);
      console.log(resposta.data, "lista");

    })

    promise.catch((erro) => {

      console.log(erro.response.data);

    })

  }, []);

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, <span data-test="user-name">{user}</span></h1>
        <BiExit />
      </Header>




      {tela3 && !listadeTransacoes.length && (
        <TransactionsContainer2>

          <SemRegistros>Não há registros de entrada ou saída</SemRegistros>

        </TransactionsContainer2>

      )}

      {tela3 && listadeTransacoes.length > 0 && (

        <TransactionsContainer>

          <Lista>
            {arrayInvertido.map((transacao) => (

              <ListItemContainer key={transacao._id}>
                <div>
                  <span>{transacao.data}</span>
                  <strong data-test="registry-name">{transacao.description}</strong>
                </div>
                <Value data-test="registry-amount" color={transacao.tipo}>{transacao.valor.replace(".", ",")}</Value>
              </ListItemContainer>

            )
            )}
          </Lista>


          <article>
            <strong>Saldo</strong>
            <Value2 data-test="total-amount" total={saldo}>{saldoFinal}</Value2>
          </article>

        </TransactionsContainer>



      )}

      <ButtonsContainer>

        <button data-test="new-income" onClick={() => {
          setTela1(true);
          setTela2(false);
          navigate("/nova-transacao/entrada");
        }}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>

        <button data-test="new-expense" onClick={() => {
          setTela1(false);
          setTela2(true);
          navigate("/nova-transacao/saida");
        }}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const SemRegistros = styled.p`
  display: flex;
  flex-wrap:wrap;
  width: 180px;
  height: 46px;
  font-family: Raleway;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color:#868686;
`

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  height:100%;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const TransactionsContainer2 = styled.article`
  flex-grow: 1;
  background-color: #fff;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Lista = styled.div`
  overflow-y: auto;
  height:650px;
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const Value2 = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.total >= 0 ? "green" : "red")};
`
const ListItemContainer = styled.li`
  height:34.2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`