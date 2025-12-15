import React from 'react'
import { IoMdAdd } from "react-icons/io";
import ListBox from '../Components/List/ListBox';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

function List() {
  const {profileData}=useAuth()
  return (
    <main className='h-full flex flex-col items-center gap-2 '>
      <section className='p-3 w-full flex justify-end '>
        <Link to={profileData?.rooms?.length==6?"":"/add"} className='text-2xl flex justify-center items-center border border-black p-4 rounded-3xl ' ><IoMdAdd/></Link>
      </section>
      <div className="w-full px-2 text-sm">upto 6 rooms can be added({profileData?.rooms?.length}-6)</div>
      <section className=' overflow-y-scroll w-full h-[80%] sor pb-3 '>
        <ListBox/>
      </section>
    </main>
  )
}

export default List