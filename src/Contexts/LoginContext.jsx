import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {

    const [login, setLogin] = useState("");
    const [listadeTransacoes, setListadeTransacoes] = useState([]);
    const [tela3, setTela3] = useState(false);
    const [user, setUser] = useState("");
    const [transacao, setTransacao] = useState(null);
   


    return (
        <LoginContext.Provider value={{ login, setLogin, listadeTransacoes, setListadeTransacoes, tela3, setTela3, user, setUser,transacao, setTransacao}}>
            {children}
        </LoginContext.Provider>
    )
}

