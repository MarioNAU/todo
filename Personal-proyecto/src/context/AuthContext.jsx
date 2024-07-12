import { createContext, useState, useContext, useEffect } from "react";
import {registerRequest, loginRequest, verifyTokenRequest} from '../api/aut';
import Cookies from "js-cookie"; 


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth Must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) =>{
    const [user, useUser] =useState(null);
    const [isAuth, setIsAuth] =useState(false);
    const [errors, setErrors] =useState([]);

    const signup = async (user) => {
        try{
            const res = await registerRequest(user);
            useUser(res.data);
            setIsAuth(true);
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const signin = async (user) =>{
        try {
            const res = await loginRequest(user);
            
            setIsAuth(true);
            useUser(res.data)
            console.log(res);
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors(error.response.data.message)
        }
    }

    useEffect(()=>{
        if(errors.lenght > 0){
            const timer = setTimeout(()=>{
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])


    useEffect(()=>{
       async function checkLogin() {
        const cookies = Cookies.get();
        if(!cookies.token){
            setIsAuth(false);
            return useUser(res.data);
        }
        try {
              const res = await verifyTokenRequest(cookies.token)
              if(!res.data) {
                setIsAuth(false)
                return;
                }
              setIsAuth(true)
              useUser(res.data)
            } catch(error) {
                setIsAuth(false);
                useUser(null)
            }
       }
       checkLogin()
    }, [])

    return (
        <AuthContext.Provider 
        value={{
            signup,
            signin, 
            user,
            isAuth,
            errors
        }}> 
          {children}
        </AuthContext.Provider>
    )
}