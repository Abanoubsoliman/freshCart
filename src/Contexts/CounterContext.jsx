import { createContext, useState } from "react";




const CounterContext = createContext(0);

export default function CounterContextProvider({ children }) {
  
  
    const [counter, setCounter] = useState(0);
    return (
        <CounterContext.Provider value={{ counter, setCounter }}>
            {children}
        </CounterContext.Provider>

    )
}




