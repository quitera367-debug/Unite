import React, { useEffect } from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { Link, useParams } from 'react-router-dom'
import { useRoom } from '../../Contexts/RoomContext'

function MemberButton() {
  const {profileData}= useAuth()
  const {roomData}=useRoom()
  // const {members}=roomData
  const { id } = useParams();
  return (
    <Link to={`/room/${id}/members`} className=' relative w-[10vh] flex  items-center '>
        <div className="w-[50%] absolute rounded-full z-[5] border left-0 bg-white aspect-square overflow-hidden border-black"><img className='h-full rounded-full w-full object-cover' src={profileData?.profilePhoto}  alt="" /></div>
        <div className="w-[50%] absolute rounded-full z-[4] border left-7 bg-white aspect-square overflow-hidden border-black flex justify-center items-center">+{roomData?.members?.length-1}</div>
    </Link>
  )
}

export default MemberButton