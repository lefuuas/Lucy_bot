import {createContext, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';


export const Logincontext = createContext();

export const LoginProvider = ({children})=>{
    const navigate = useNavigate();

    
    const initialLoginState = localStorage.getItem('login') === 'true';
    const [login, setLogin] = useState(initialLoginState);
  
    const tooglelogin = () => {
      setLogin((prevLogin) => {
        const newLoginState = !prevLogin;
        localStorage.setItem('login', String(newLoginState));
        return newLoginState;
      });
    };
  
    const islogin = () => {
      console.log(login);
      if (!login) {
        navigate('/');
      }
    };
    return(
        <Logincontext.Provider value={{login, tooglelogin, islogin}}>{children}</Logincontext.Provider>

    )
}