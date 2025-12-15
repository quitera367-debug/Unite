import React, { useState } from 'react'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'

function AddRoom() {
    const [roomSec,setRoomSec]=useState(true)
  return (
    <div className='h-full w-full'>
        <main  className='h-full w-full flex flex-col items-center justify-center gap-6'>
            <section className='w-[95%]  flex gap-2  p-2 mt-4 rounded-2xl font-semibold'>
                <button onClick={()=>setRoomSec(true)} className={`p-3  flex-1 border rounded-xl`} style={{color:`${roomSec?"#000":"#929292"}`}}>Join</button>
                <button onClick={()=>setRoomSec(false)} className={`p-3  flex-1 border rounded-xl`} style={{color:`${roomSec?"#929292":"#000"}`}}>Create</button>
            </section>
            <section className='w-[95%] h-[60%] flex justify-center items-center p-2'>
                {roomSec?<JoinRoom/>:<CreateRoom/>}
            </section>
        </main>
    </div>
  )
}

export default AddRoom