const User = require("../models/userModel");
const Content = require("../models/contentModel");
const Room = require("../models/roomModel");
const uploadToCloudinary = require("../utils/uploadMultipleToCloudinary");

const uploadVideo = async (req, res) => {
  try {
    const { roomId, title } = req.body;
    console.log(req.body);

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const content = await Content.findById(room.contentList);

    let updatedContent;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No video file provided" });
    }

    const file = req.files[0];
    const result = await uploadToCloudinary(file.buffer, "contents");

    const newPost = {
      title,
      user: user._id,
      url: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      createdAt: new Date(),
    };

    if (!content) {
      const newContentDoc = await Content.create({
        room: roomId,
        content: [newPost],
      });

      room.contentList = newContentDoc._id;
      await room.save();
      updatedContent = newContentDoc;
    } else {
      updatedContent = await Content.findByIdAndUpdate(
        room.contentList,
        { $push: { content: newPost } },
        { new: true }
      );
    }
    if (room.taskComplete === false) {
      room.streak += 1;
      room.taskComplete = true;
      await room.save(); 
    } else {
      console.log("Video uploaded, but streak already counted for today.");
    }

    res.status(200).json({
      success: true,
      data: updatedContent,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getRoomContent = async (req, res) => {
try {
    // Expecting URL like: /api/content/video?roomId=...&videoId=...
    const { roomId, videoId } = req.query; 

    // 1. Find the Main Content Document for the Room
    // We populate 'content.user' to get the uploader's name/pic immediately
    const contentDoc = await Content.findOne({ room: roomId })
      .populate("content.user", "name profilePhoto");

    if (!contentDoc) {
      return res.status(404).json({ message: "No content found for this room" });
    }

    // 2. Filter the Array in JavaScript to find the specific video
    // We compare IDs using .toString() to be safe
    const videoPost = contentDoc.content.find(
      (item) => item._id.toString() === videoId
    );

    if (!videoPost) {
      return res.status(404).json({ message: "Video not found" });
    }

    // 3. Return ONLY that specific video object
    res.status(200).json({ video: videoPost });

  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadVideo,
  getRoomContent,
};
