import React from 'react'
import Contents from './Contents'
import ContentItem from './ContentItem'
import { useRoom } from '../../Contexts/RoomContext'

function ContentList() {
  const {roomData}=useRoom()

  return (
    <main className="h-full w-full flex gap-2 flex-col ">
          <section className="w-full py-4 flex-1 grid-cols-3 grid relative overflow-y-scroll sor">
            {roomData?.contentList?.content?.map((e,i)=><ContentItem key={i} data={e}/>)}
            
            
            

          </section>
          <section className="h-[10vh] w-full "></section>
        </main>
  )
}

export default ContentList