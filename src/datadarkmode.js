import { createContext, useReducer } from "react";
const ThemeContexttt = createContext();
const data =  {
  mode:localStorage.getItem('mode')=='dark'?'dark':'lighet' ,
  mode1:localStorage.getItem('mode1')=='dark1'?'dark1':'lighet'
}
// localStorage.getItem('mode')=='lighet'?'lighet':'dark'
const initialData = data
const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...firstState, mode: action.mode };
      case "CHANGE_NAME1":
        return { ...firstState, mode1: action.mode1 };
    default:
      return firstState;
  }}

export function ThemeProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const changeName = (asd) => {
    localStorage.setItem('mode',asd)
    dispatch({ type: "CHANGE_NAME", mode: asd });  
  }; 
  const changeName1 = (asdf) => {
    localStorage.setItem('mode1',asdf)
    dispatch({ type: "CHANGE_NAME1", mode1: asdf});

  }; 

  return (
     <ThemeContexttt.Provider value={{ ...firstState,changeName,changeName1 }}>
      {children}
     </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;