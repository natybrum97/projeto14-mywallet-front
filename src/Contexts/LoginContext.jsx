import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider ({children}) {

    const [login, setLogin] = useState({});

    return (
        <LoginContext.Provider value={{login, setLogin}}>
            {children}
        </LoginContext.Provider>
    )
}

