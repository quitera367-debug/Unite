import React, { useEffect } from 'react'
import { useAuth } from '../Contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

function PrivateRoute() {
  const { profileData, loading } = useAuth();

  useEffect(()=>{

  },[])
  if(loading){
    toast.loading("loading...");
  }
  else if(!profileData){
    toast.dismiss();
    return <Navigate to={"/"}  replace/>
  }
  return <Outlet/>
}



export default PrivateRoute