import React from 'react'

function Background() {
  return (
    <div className='h-screen w-full fixed  z-[-99] bg-cover bg-no-repeat bg-center' >
        <section className='h-[60%] w-full p-2 flex flex-col justify-end'>
        <h1 className='text-6xl relative'>Unite <span className='text-sm absolute bottom-0 '>βeta</span>
        </h1>
        <p className='text-sm w-[80%]'>
          Keep the connection alive—create a room, invite your squad, and never break the daily vlog streak.
           </p>
        </section>
    </div>
  )
}

export default Background