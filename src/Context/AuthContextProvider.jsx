import React, { createContext, useEffect, useState } from 'react'

export let AuthContext= createContext()

export default function AuthContextProvider({children}) {
    let[token ,setToken] = useState(null);
    useEffect(()=>{
        let tokenStoreg =localStorage.getItem('token')
        if(tokenStoreg){
            setToken(tokenStoreg);
        }
    },[])
  return (
    <AuthContext.Provider value={{token,setToken}}>
        {children}
        </AuthContext.Provider>
  )
}

