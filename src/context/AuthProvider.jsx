import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'
export const AuthContext = createContext()
const AuthProvider = ({children}) => {
  // localStorage.clear()
  const [userData, setuserData] = useState(null)
  
  useEffect(() => { 
    setLocalStorage()
    const {employees} = getLocalStorage()
    setuserData(employees)
  },[])
  
  
  return (
    <AuthContext.Provider value={[userData, setuserData]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider