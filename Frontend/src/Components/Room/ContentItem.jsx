import React from 'react'
import { Link, useParams } from 'react-router-dom'

function ContentItem({data}) {
  const {id}=useParams()
  return (
    <Link to={`/rooms/${id}/${data._id}`} className='border h-[20vh] overflow-hidden bg-[#111]'>
      <video src={data?.url?.url} className='h-full w-full'></video>
      
    </Link>
  )
}

export default ContentItem