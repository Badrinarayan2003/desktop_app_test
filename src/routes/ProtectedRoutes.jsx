import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate, Outlet} from "react-router-dom"


const ProtectedRoutes = () => {
    const {accessToken} = useSelector((state)=> state.auth)
    if(!accessToken) {
      return <Navigate to="/login" replace/>
    }
  return <Outlet/>
}

export default ProtectedRoutes
