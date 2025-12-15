import React from 'react'
import ListItem from './ListItem'
import { useAuth } from '../../Contexts/AuthContext'

function ListBox() {
  const {profileData}=useAuth()
  return (
    <main className='w-full  p-2 flex flex-col gap-2'>
      {profileData?.rooms?.map((e,i)=><ListItem room={e} key={i}/>)}
    </main>
  )
}

export default ListBox