import React, { useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useRoom } from "../../Contexts/RoomContext";
import { useAuth } from "../../Contexts/AuthContext";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";

function PlayRoom() {
  const { id } = useParams();
  const { Pick,roomData } = useRoom();
  // const {}=roomData
  const {profileData}=useAuth()
  
  useEffect( () => {
     Pick(id);
  }, []);
  // useEffect(()=>{},[roomData])

  return (
    <main className="h-full w-full flex gap-2 flex-col ">
      <section className="w-full bg-slate-300 rounded-xl overflow-hidden h-[60%] relative">
        <img src={roomData?.todaysPick?.user?.profilePhoto || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} className="h-full w-full object-cover" alt={roomData?.todaysPick?.user?.profilePhoto||"1"} />
        <h1 className="absolute bottom-0 p-2 bg-white rounded-tr-xl left-0 text-2xl font-medium">
          {roomData?.todaysPick?.user?.name || "start by midnight"}
        </h1>
      </section>
      <Link to={roomData?.todaysPick?.user?._id==profileData?._id?`/${id}/upload`:""} className="w-full bg-[#f8f8f8] border rounded-xl text-[#d6d6d6] p-2 h-[20%] flex justify-center items-center text-8xl">
        {roomData?.taskComplete?
        <div className="text-green-200">
          <FaRegCircleCheck/>
        </div>
        
        :roomData?.todaysPick?.user?._id==profileData?._id?<FiUploadCloud />:<FaRegClock/>}
      {}
      </Link>
    </main>
  );
}

export default PlayRoom;
