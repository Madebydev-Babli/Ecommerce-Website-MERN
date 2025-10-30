import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { AuthDataContext } from './authContext';
import axios from 'axios';

export const userDataContext = createContext()
const UserContext = ({ children }) => {
  const [userData, setUserData] = useState("");
  let { serverUrl } = useContext(AuthDataContext);

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/getcurrentuser`,
        { withCredentials: true })
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  let value = {
    userData, setUserData, getCurrentUser
  }
  
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext