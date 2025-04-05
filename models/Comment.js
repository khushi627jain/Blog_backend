const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  replies: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
