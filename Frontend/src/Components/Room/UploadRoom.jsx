import React, { useRef, useState } from "react";
import InputBlock from "../Auth/InputBlock";
import ButtonBlock from "../Auth/ButtonBlock";
import { FiUploadCloud } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useContent } from "../../Contexts/ContentContext";

function UploadRoom() {
  const {id}=useParams()
  const {Upload}=useContent()
  const navigate=useNavigate()
  const videoRef = useRef(document.createElement("video"));
  const [refData, setRefData] = useState({
    url: "",
    title: "",
    file: null,
    roomId:id || "",
  });
  const { url, title } = refData;
const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      const file = files[0];

      if (!file) return;

      if (!file.type.startsWith("video/")) {
        toast.error("Only video files are allowed!");
        return;
      }

      const maxSize = 50 * 1024 * 1024; 
      console.log(file.size);
      
      if (file.size > maxSize) {
        toast.error("File is too large! Max 50MB allowed.");
        return;
      }

      const previewURL = URL.createObjectURL(file);
      
      videoRef.current.src = previewURL;
      videoRef.current.onloadedmetadata = () => {
        const duration = videoRef.current.duration;
        
        if (duration > 60) {
          toast.error("Video must be 60 seconds or less!");
          URL.revokeObjectURL(previewURL); 
          return;
        }

        setRefData({ ...refData, url: previewURL, file });
        toast.success("Video selected!");
      };
    } else {
      setRefData({ ...refData, [name]: value });
    }
  };
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", refData.title);
    formData.append("roomId", id);
    if (refData.file) {
      formData.append("video", refData.file);
    }
    toast.loading("Uploading...");
    navigate(`/room/${id}`)
  await Upload(formData);
  toast.dismiss();

  toast.success("Uploaded");
  }
  return (
    <main className="h-full w-full flex gap-4 p-2 flex-col ">
      <section className="w-full bg-[#e9e9e9] border text-[#c7c7c7] rounded-xl overflow-hidden h-[60%] flex justify-center items-center text-9xl relative">
        {url ? (
          <video src={url} controls className="h-full w-full"></video>
        ) : (
          <FaPlay />
        )}
      </section>
      <form onSubmit={handleSubmit} className="w-full bg-[#f8f8f8] border rounded-xl  p-2 flex-col gap-2 flex justify-center items-center">
        <div className="w-full flex justify-center items-center text-[#808080]">
          <label
            htmlFor="url"
            className="w-full border flex justify-center items-center text-2xl p-2 rounded-md "
          >
            <FiUploadCloud />
          </label>
          <input
            type="file"
            name="url"
            required
            accept="video/*"
            className=" hidden"
            onChange={handleChange}
            id="url"
          />
        </div>
        <InputBlock
          labelVal="Title"
          inType="text"
          placeName="Enter a title"
          massage=""
          idValue="title"
          value={title}
          onChange={handleChange}
        />
        <ButtonBlock text={"Upload"} />
      </form>
    </main>
  );
}

export default UploadRoom;
