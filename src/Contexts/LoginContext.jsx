import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();

export function LoginProvider({ children }) {

    const localUser = localStorage.getItem("token")
    console.log(localUser, "Local")

    const [login, setLogin] = useState(localUser !== null ? localUser: "");
    const [listadeTransacoes, setListadeTransacoes] = useState([]);
    const [tela3, setTela3] = useState(false);
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localUser === null) {
            console.log(login);
            navigate("/");
        } else {
            navigate("/home");
        }
    }, [])



    return (
        <LoginContext.Provider value={{ login, setLogin, listadeTransacoes, setListadeTransacoes, tela3, setTela3, user, setUser }}>
            {children}
        </LoginContext.Provider>
    )
}

