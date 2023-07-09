import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import TransactionsPagecopy from "./pages/TransactionPagecopy"
import { useState } from "react"

export default function App() {

  const [tela1, setTela1] = useState(false);
  const [tela2, setTela2] = useState(false);

  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage tela1={tela1} setTela1={setTela1} tela2={tela2} setTela2={setTela2} />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage tela1={tela1} setTela1={setTela1} tela2={tela2} setTela2={setTela2} />} />
          <Route path="/editar-registro/:tipo/:id" element={<TransactionsPagecopy />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
