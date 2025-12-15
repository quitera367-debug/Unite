import React, { createContext, useContext, useState } from 'react'

const HomeApi=createContext()

export const HomeProvider=({children})=> {
    const [seePassword,setSeePassword]=useState(true)
    const [page,setPage]=useState(true)

  return (
    <HomeApi.Provider value={{seePassword,setSeePassword,page,setPage}}>{children}</HomeApi.Provider>
  )
}

export const useHome = ()=> useContext(HomeApi)