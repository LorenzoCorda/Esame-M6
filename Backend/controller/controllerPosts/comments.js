const Post = require("../../models/post");

const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const comment = { ...req.body, createdAt: new Date() };
  post.comments.push(comment);
  await post.save();
  res.status(201).json(post.comments[post.comments.length - 1]);
};

const updateComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comment = post.comments.id(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  comment.text = req.body.text;
  await post.save();
  res.json(comment);
};

const deleteComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments = post.comments.filter(
    (c) => c._id.toString() !== req.params.commentId
  );
  await post.save();
  res.status(204).end();
};

module.exports = {
  addComment,
  updateComment,
  deleteComment,
};
