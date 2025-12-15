import React from 'react'

function MemberItem({mood}) {
console.log(mood);
const {name,profilePhoto}= mood

  return (
    <div className='w-full flex gap-2 items-center'>
        <img src={profilePhoto} className='h-[6vh] w-[6vh] rounded-xl bg-white' alt={profilePhoto} />
        <h2 className='bg-white px-1 rounded-md  border'>{name}</h2>
        
    </div>
  )
}

export default MemberItem