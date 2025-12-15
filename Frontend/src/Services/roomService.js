import api from "./api";

const roomService = {
  create: async (payload) => {
    const {data}  = await api.post("/rooms", payload, {
      withCredentials: true,
    })
    return data;
  },
   join: async (payload) => {
    const room  = await api.put("/rooms", payload, {
      withCredentials: true,
    })
    return room;
  },
  pick: async (payload) => {
    const {data}  = await api.get(`/rooms/${payload}`, {
      withCredentials: true,
    })
    return data;
  },
};

export default roomService;
