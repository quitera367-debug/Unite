import api from "./api";

const contentService = {
  upload: async (payload) => {
    const {data}  = await api.post("/contents", payload, {
      withCredentials: true,
    })
    return data;
  },
   contents: async (roomId, videoId) => {
    const {data}  = await api.get("/contents",{
    params: { roomId, videoId },
    withCredentials: true 
  })
    return data;
  },
};

export default contentService;
