import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowReturnRight } from "react-icons/bs";

function ListItem({room}) {
  const {name,streak,uid,_id}=room?.room
  
  return (
    <Link to={`/room/${_id}`} onClick={()=>{}} className='w-full shadow-sm border p-2 flex flex-col gap-1 rounded'>
        <section className='w-full  leading-[1]'>{name}</section>
        <section className='w-full items-center flex gap-2 pl-2 leading-[1]'>
            <div className=""><BsArrowReturnRight/></div>
            <div className="border rounded-full flex justify-center items-center px-3 text-sm">{streak} $</div>
            <div className="">{uid}</div>
        </section>

    </Link>
  )
}

export default ListItem