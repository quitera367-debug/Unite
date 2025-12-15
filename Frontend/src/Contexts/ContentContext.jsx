import React, { createContext, useContext, useState } from "react";
import contentService from "../Services/contentService";

const ContentApi = createContext();

export const ContentProvider = ({ children }) => {
 const [videoData,setVideoData]=useState()

  const Upload = async (e) => {
    try {
      const data = await contentService.upload(e);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
   const Contents = async (roomId, videoId) => {
    try {
      const {video} = await contentService.contents(roomId, videoId);
      console.log(video);
      setVideoData(video)
    } catch (err) {
      console.log(err);
    }
  };
  return <ContentApi.Provider value={{Upload,Contents,videoData}}>{children}</ContentApi.Provider>;
};

export const useContent = () => useContext(ContentApi);
