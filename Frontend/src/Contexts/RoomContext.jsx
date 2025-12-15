import React, { createContext, useContext, useState } from "react";
import roomService from "../Services/roomService";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const RoomApi = createContext();
export const RoomProvider = ({ children }) => {
const [roomData,setRoomData]=useState()

  const { setProfileData,UserProfile } = useAuth();
  const Create = async (e) => {
    try {
      const { room } = await roomService.create(e);
      console.log(room);
      UserProfile()
      toast.success("Room Created");
    } catch (err) {
      toast.error("Surver error");
    }
  };
  const Join = async (e) => {
    try {
      const {data} = await roomService.join(e);
      console.log(data);
      toast.success("Room joined");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const Pick = async (e) => {
    try {
      const data = await roomService.pick(e);
      setRoomData(data)
      console.log(data);
      
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <RoomApi.Provider value={{ Create, Join, Pick,roomData,setRoomData }}>
      {children}
    </RoomApi.Provider>
  );
};

export const useRoom = () => useContext(RoomApi);
