const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const roomSchema = new mongoose.Schema({
  room:{ type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter your name"] },
    email: {type: String,required: [true, "Please enter your email"],unique: true,match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email",],},
    password: { type: String, required: [true, "Please enter a password"], minlength: [8, "Password must be at least 8 characters"], select: false,},
    role: { type: String, enum: ["user", "admin"], default: "user",},
    profilePhoto: {type: String, default: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",},
    rooms: [roomSchema],
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
