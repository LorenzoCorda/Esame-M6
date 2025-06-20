const PostSchema = require("../../models/post");

const findAll = async (page, pageSize) => {
  const posts = await PostSchema.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .sort({ createdAt: -1 })
    .select();

  const totalPosts = await PostSchema.countDocuments();
  const totalPages = Math.ceil(totalPosts / pageSize);
  return {
    page,
    pageSize,
    totalPosts,
    totalPages,
    posts,
  };
};

const findOne = async (id) => {
  return await PostSchema.findById(id);
};

const findByCategory = async (category) => {
  return PostSchema.find({
    category: {
      $regex: category,
      $options: "i",
    },
  });
};

const createPosts = async (body) => {
  console.log(body);
  const newPost = new PostSchema(body);
  const postToSave = await newPost.save();
  return {
    message: "Post saved successfully",
    post: postToSave,
  };
};

const updatePost = async (postPayload, id) => {
  const options = { new: true };
  return PostSchema.findByIdAndUpdate(id, postPayload, options);
};

const deletePost = async (id) => {
  return PostSchema.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  findOne,
  findByCategory,
  createPosts,
  updatePost,
  deletePost,
};
