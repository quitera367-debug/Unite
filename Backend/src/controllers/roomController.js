const Room = require("../models/roomModel");
const User = require("../models/userModel");
const Content = require('../models/contentModel');

const createRoom = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("rooms.room");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, uid, code } = req.body;
    const roomID = await Room.findOne({ uid });
    if (roomID) {
      return res.status(400).json({ message: "Room already exists" });
    }
    if (!name || !uid || !code) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const room = new Room({
      name,
      uid,
      code,
      admin: user._id,
      streak: "0",
      members: [{ member: user._id }],
    });

    // 2. Create Content Doc
    const contentDoc = new Content({
      room: room._id,
      content: []
    });

    room.contentList = contentDoc._id;
    user.rooms.push({ room: room._id });

    const userRoom = await user.save();

    console.log(userRoom);

    const savedRoom = await room.save();

    res.status(201).json({
      message: "Room created successfully",
      room: { savedRoom, userRoom },
    });
  } catch (error) {
    console.error("Error creating Room:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const roomIds = user.rooms.map((item) => item.room);
    const rooms = await Room.find({ uid: { $in: roomIds } });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("members.member todaysPick.user contentList");
    if (!room) return res.status(404).json({ message: "room not found" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const joinRoom = async (req, res) => {
  try {
    const { uid, code } = req.body;

    const room = await Room.findOne({ uid });
    const user = await User.findById(req.user._id).populate("rooms.room");
    

    if (!room) return res.status(404).json({ message: "room not found" });
    if (!user) return res.status(404).json({ message: "user not found" });
    if (room.code != code) return res.status(400).json({ message: "Incorrect code" });
    
    const isExist = user.rooms.find(e=>e.room == room._id)
    console.log(isExist);
    if (isExist) return res.status(400).json({ message: "You're already in this room" })


    room.members.push({member:user._id});
    user.rooms.push({ room: room._id });

    const savedRoom = await room.save();
    const savedUser = await user.save();

    res.status(200).json({ savedRoom, savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const leaveRoom = async (req, res) => {
  try {
    const { uid } = req.body;
    const user = await User.findById(req.user._id);
    const room = await Room.findOne({ uid });

    if (!room) return res.status(404).json({ message: "room not found" });
    if (!user) return res.status(404).json({ message: "user not found" });

    room.members.member.pull(user._id);
    user.rooms.room.pull(uid);

    const savedRoom = await room.save();
    const savedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully left the room",
      savedRoom,
      savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedRoom)
      return res.status(404).json({ message: "Room not found" });

    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom)
      return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  joinRoom,
  leaveRoom,
};
