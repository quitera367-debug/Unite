const express = require("express");
const router = express.Router();
const { uploadVideo, getRoomContent } = require("../controllers/contentController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/",protect,upload.array("video"), uploadVideo)
router.get("/",protect, getRoomContent)

module.exports = router;