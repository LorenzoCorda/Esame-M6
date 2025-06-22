const express = require("express");
const posts = express.Router();
const { upload, cloudUpload } = require("../../middlewares/multer/index");
const postController = require("../../controller/controllerPosts/post");
const verifiedToken = require("../../middlewares/verifiedToken");
const commentController = require("../../controller/controllerPosts/comments");

const {
  postBodyValidation,
  postBodyValidator,
} = require("../../middlewares/validatePostBody");

posts.get("/", postController.findAll);
posts.get("/:id", postController.findOne);
posts.get("/search/category", postController.findByCategory);
posts.post(
  "/create",
  postBodyValidation,
  postBodyValidator,
  [verifiedToken],
  postController.createPost
);
// file localhost
posts.post(
  "/internal-upload",
  upload.single("img"),
  postController.uploadFileOnDisk
);
// file cloudinary
posts.post(
  "/cloud-upload",
  cloudUpload.single("img"),
  postController.uploadFileOnCloudinary
);
posts.patch("/update/:id", postController.updatePost);
posts.delete("/delete/:id", postController.deletePost);
/*embending comments*/

posts.post("/:id/comments", commentController.addComment);
posts.put("/:id/comments/:commentId", commentController.updateComment);
posts.delete("/:id/comments/:commentId", commentController.deleteComment);

module.exports = posts;
