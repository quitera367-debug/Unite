import React from 'react'

function ButtonBlock({text,clickEvent}) {
  return (
    <button type='submit' className=' mt-4 bg-[#0e0e0e] text-[#fff] p-3 w-full rounded-md font-semibold ' >{text}</button>
  )
}

export default ButtonBlock