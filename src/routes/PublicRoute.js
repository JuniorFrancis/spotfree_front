import React  from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AUTHENTICATED_ENTRY } from 'configs/AppConfig'

const PublicRoute = () => {

	const { token } = localStorage.getItem('AUTH_TOKEN') || false;
  
	return token ? <Navigate to={AUTHENTICATED_ENTRY} /> : <Outlet/>
}

export default PublicRoute