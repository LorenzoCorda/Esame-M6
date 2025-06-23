const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "Author is required"],
    minlength: [2, "Author must be at least 2 characters"],
    trim: true,
  },
  text: {
    type: String,
    required: [true, "Comment text is required"],
    minlength: [3, "Comment must be at least 3 characters"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      default: "https://lorem.picsum/200",
      /* match: /^https:\/\/[^\s/$.?#].[^\s]*$/, */
    },
    readTime: {
      value: {
        type: mongoose.Schema.Types.Decimal128,
        min: 0,
      },
      unit: {
        type: String,
        enum: ["sec", "min"],
        default: "min",
      },
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("post", PostSchema, "posts");
