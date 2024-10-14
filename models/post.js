const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      index: true,
    },
    content: String,
    mediaUrls: [String],
    likes: [String],
    NumberOfLikes: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: { createdAt: "timestamp" } }
);

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      index: true,
    },
    isPostDeleted: {
      type: Boolean,
      default: false,
    },
    userId: String,
    content: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: { createdAt: "timestamp" } }
);

module.exports = {
  PostSchema: mongoose.model("Post", postSchema),
  CommentSchema: mongoose.model("Comment", commentSchema),
};
