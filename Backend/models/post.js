const mongoose = require("mongoose");

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
    comments: [
      {
        author: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("post", PostSchema, "posts");
