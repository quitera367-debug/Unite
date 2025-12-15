import React, { useState } from 'react'
import InputBlock from '../Auth/InputBlock'
import ButtonBlock from '../Auth/ButtonBlock'
import { useRoom } from '../../Contexts/RoomContext';
import { useNavigate } from 'react-router-dom';

function CreateRoom() {
  const navigate=useNavigate()
  const {Create}=useRoom()
    const [roomData, setRoomData] = useState({
    name: "",
    uid: "",
    code: "",
  });
  const { name, uid, code } = roomData;
  const handleChange = (e) => {
    const {name,value}=e.target
    setRoomData({...roomData,[name]:value})
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    Create(roomData)
    navigate("/list")

  }
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <InputBlock
            labelVal="Enter a name"
            inType="text"
            placeName="Room name"
            idValue="name"
            value={name}
            onChange={handleChange}
          />
      <InputBlock
        labelVal="Create Room Id"
        inType="text"
        placeName="Create a roomid"
        idValue="uid"
        value={uid}
        onChange={handleChange}
      />
      <InputBlock
        labelVal="Create room code"
        inType="text"
        placeName="Create room code"
        idValue="code"
        value={code}
        onChange={handleChange}
      />
      <ButtonBlock text={"Create"}/>
    </form>
  )
}

export default CreateRoom