import React, { useState } from "react";
import InputBlock from "../Auth/InputBlock";
import ButtonBlock from "../Auth/ButtonBlock";
import { useRoom } from "../../Contexts/RoomContext";
import { useNavigate } from "react-router-dom";

function JoinRoom() {
    const {Join}=useRoom()
  const navigate=useNavigate()


  const [roomData, setRoomData] = useState({
    uid: "",
    code: "",
  });
  const { uid, code } = roomData;
  const handleChange = (e) => {
    const {name,value}=e.target
    setRoomData({...roomData,[name]:value})
  };
      
    const handleSubmit=(e)=>{
      e.preventDefault();
      Join(roomData)
    navigate("/list")

    }
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <InputBlock
        labelVal="Room Id"
        inType="text"
        placeName="Enter valid room id"
        idValue="uid"
        value={uid}
        onChange={handleChange}
      />
      <InputBlock
        labelVal="Room code"
        inType="text"
        placeName="Enter room code"
        idValue="code"
        value={code}
        onChange={handleChange}
      />
      <ButtonBlock text={"Join"} />
    </form>
  );
}

export default JoinRoom;
