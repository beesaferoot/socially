const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      index: true,
    },
    livesAt: String,
    bio: String,
    dob: Date,
    imageUrl: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastEditedAt: Date,
    following: [String],
    followers: [String],
    userDeletedAt: Date,
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "lastEditedAt" } }
);

module.exports = mongoose.model("Profile", profileSchema);
