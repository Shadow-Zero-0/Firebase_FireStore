import  '../Acetylate the parts/main.css';
import { useContext } from 'react';
import  '../Acetylate the parts/Allstyle.css';
import ThemeContext from "../datadarkmode";
const Main = (  {children}) => {
  const { mode1 } = useContext(ThemeContext);
  return (
    <div className={`section ${mode1}`}>
     {children}
    </div>
  );
}

export default Main;
