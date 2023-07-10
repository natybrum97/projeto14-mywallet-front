import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginContext = createContext();

export function LoginProvider({ children }) {

    const navigate = useNavigate();

    const [listadeTransacoes, setListadeTransacoes] = useState([]);
    const [user, setUser] = useState("");
    const [transacao, setTransacao] = useState(null);

    const isLoged = () => {
        let token = localStorage.getItem("token");

        if(token){
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token === null || token === undefined){
            navigate("/");
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common['Authorization'] = "";
        navigate("/");
    }
   


    return (
        <LoginContext.Provider value={{ listadeTransacoes, setListadeTransacoes,
         user, setUser,transacao, setTransacao, isLoged, logout}}>
            {children}
        </LoginContext.Provider>
    )
}

