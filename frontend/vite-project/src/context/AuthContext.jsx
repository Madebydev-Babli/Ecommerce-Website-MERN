import React, { createContext } from 'react'

export const AuthDataContext = createContext();
const AuthContext = ({ children }) => {

  let serverUrl = "https://ecommerce-website-mern-backend-6c07.onrender.com"

  let value = {
    serverUrl
  }
  return (
    <div>
      <AuthDataContext.Provider value={value}>
        {children}
      </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext
