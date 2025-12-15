import React from "react";
import MemberItem from "./MemberItem";
import { useRoom } from "../../Contexts/RoomContext";

function Members() {
  const { roomData} = useRoom();
  console.log(roomData);

  return (
    <div className="flex flex-col gap-2 h-full w-full  overflow-y-scroll sor">
      {roomData?.members?.map((e, i) => (
        <>
          <MemberItem mood={e?.member} key={i} />
        </>
      ))}
    </div>
  );
}

export default Members;
