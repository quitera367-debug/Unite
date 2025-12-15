const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  leaveRoom,
  joinRoom,
} = require("../controllers/roomController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/",protect, createRoom)
router.get("/",protect, getRooms);
router.patch("/:id",protect, updateRoom);
router.put("/",protect, joinRoom);
router.patch("/",protect, leaveRoom);
router.get("/:id",protect, getRoomById);
router.delete("/:id",protect, deleteRoom);

module.exports = router;