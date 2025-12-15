const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  member:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});


const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    uid: { type: String, required: true, trim: true },
    code: { type: String, required: true },
    admin:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    streak: { type: Number, required: true },
    members:[memberSchema],
    contentList: { type: mongoose.Schema.Types.ObjectId, ref: "Content"},
    taskComplete: { type: Boolean, default: false },
    edit: { type: Boolean, default: true },
    todaysPick: { 
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
      pickedAt: { type: Date, default: Date.now }
  }
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
