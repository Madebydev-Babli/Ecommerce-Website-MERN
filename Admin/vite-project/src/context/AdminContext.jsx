import React, { createContext, useContext, useState, useEffect } from 'react'
import { AuthDataContext } from './AuthContext';
import axios from 'axios';

export const AdminDataContext = createContext();

const AdminContext = ({children}) => {
    let [adminData,setAdminData] = useState(null);
    let { serverUrl } = useContext(AuthDataContext);
    


    const getAdmin = async () => {
        try {
          let result = await axios.get(`${serverUrl}/api/user/getadmin`,
            { withCredentials: true })
          setAdminData(result.data);
          console.log(result.data);
        } catch (error) {
          setAdminData(null);
          console.log(error);
        }
      }

      useEffect(() => {
        getAdmin()
      }, [])
      
    let value={
        adminData,setAdminData,getAdmin
    }
  return (
    <div>
        <AdminDataContext.Provider value={value}>
            {children}
        </AdminDataContext.Provider>
    </div>
  )
}

export default AdminContext