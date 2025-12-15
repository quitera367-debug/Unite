import React, { useEffect, useRef } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";
import { useContent } from "../../Contexts/ContentContext";

function Content() {
  const {id,vid}=useParams()
  const {Contents,videoData}=useContent()
  const videoRef = useRef(null);
  useEffect(()=>{
    Contents(id,vid)
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the video is visible on screen
        if (entry.isIntersecting) {
          videoRef.current.play().catch((error) => {
            // Handle error (e.g., user hasn't interacted with page yet)
            console.log("Autoplay blocked:", error);
          });
        } else {
          // Pause if it goes off screen
          videoRef.current.pause();
        }
      },
      { threshold: 0.6 } // Play when 60% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  },[])
  return (
    <main className="h-full w-full flex gap-2 p-1 flex-col ">
      <section className="w-full  bg-[#111] rounded-xl p-2 flex-1 relative">
        <Link to={`/room/${id}/contents`} className=" bg-white cursor-pointer p-2 z-50 absolute top-2 right-2 rounded-full">
          <RxCross2 />
        </Link>
        <video ref={videoRef} src={videoData?.url?.url} className="h-full w-full" autoPlay playsInline loop></video>
        <div className="absolute bottom-0 p-2 hover:bg-[#8b8b8b38] w-full left-0 ">
          <div className="text-xl text-[#fff]">{videoData?.title}</div>
          <div className="pl-2 flex items-center gap-2">
            <div className="text-[white]">
              <BsArrowReturnRight />
            </div>
            <img
              src={videoData?.user?.profilePhoto}
              alt={videoData?.user?.name}
              className=" rounded-full border h-[6vh] w-[6vh] bg-black"
            />
            <div className="text-[#fff]">{videoData?.user?.name}</div>
          </div>
        </div>
      </section>
      <section className="h-[10vh] w-full "></section>
    </main>
  );
}

export default Content;
