import React, { useEffect } from "react";
import MemberButton from "../Components/Room/MemberButton";
import { Link, Outlet, useParams } from "react-router-dom";
import { useRoom } from "../Contexts/RoomContext";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";

function Room() {
  const { id } = useParams();
  const { Pick } = useRoom();
  useEffect( () => {
     Pick(id);
  }, []);
  return (
    <main className="h-full w-full flex gap-2 p-2 flex-col ">
      <section className="w-full flex  border-b border-[#f7f7f7] justify-between p-2  items-center ">
        <div className="flex items-center">
          {/* <Link to={`/room/${id}`} className="p-3 flex justify-center items-center border rounded-full mr-2"><IoIosArrowBack/></Link> */}
          <MemberButton/>
          <div className="">Members</div>
        </div>
        <Link to={`/room/${id}/contents`} className="font-semibold p-3 text-xl rounded-full border flex justify-center items-center">
          <CiLocationArrow1/>
        </Link>
        
        
      </section>
      <Outlet />
    </main>
  );
}

export default Room;
