const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    content: [
      {
        title: { type: String, required: true, trim: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        url: {
          url: { type: String, required: true },
          public_id: { type: String },
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Content", contentSchema);

module.exports = Product;
