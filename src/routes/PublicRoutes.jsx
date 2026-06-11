import React from 'react'
import {Navigate, Outlet} from "react-router-dom"
import {useSelector} from "react-redux"

const PublicRoutes = () => {
    const {accessToken} = useSelector((state) => state.auth)

    if(accessToken){
        return <Navigate to="/home" replace/>
    }
    return <Outlet/>
}

export default PublicRoutes
