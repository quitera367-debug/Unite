import React, { useEffect } from 'react'
import Members from './Members'
import { useRoom } from '../../Contexts/RoomContext';
import { useParams } from 'react-router-dom';

function MemberList() {
  // const { id } = useParams();

  //   const { Pick } = useRoom();
  //   useEffect( () => {
  //      Pick(id);
  //   }, []);
  return (
        <main className="h-full w-full flex gap-2 flex-col ">
          <section className="w-full   rounded-xl p-2 py-4 flex-1 relative overflow-y-scroll sor">
            <Members/>


          </section>
          <section className="h-[10vh] w-full "></section>
        </main>
  )
}

export default MemberList