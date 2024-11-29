import React, {createContext, useState} from "react";

export const UserContext = createContext();

const dataFixed = {
    nombre: 'error'
}

export const UserProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(dataFixed);

    return(
        <UserContext.Provider value={{usuario, setUsuario}}>
            { children }
        </UserContext.Provider>
    )
}
