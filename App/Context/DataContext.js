import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) =>{
    const [data, setData] = useState();
    //console.log(data);
    return(
        <DataContext.Provider value={{
            data, setData
        }}>
        {children}
        </DataContext.Provider>
    )
}