const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  content: String,
  created: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
