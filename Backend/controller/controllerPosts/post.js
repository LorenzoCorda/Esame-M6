const postService = require("../../services/servicesPost/post");

const findAll = async (request, response) => {
  try {
    const { page = 1, pageSize = 25 } = request.query;
    const { totalPosts, totalPages, posts } = await postService.findAll(
      page,
      pageSize
    );
    if (!posts) {
      return response.status(404).send({
        statusCode: 404,
        message: "Posts not found",
      });
    }

    response.status(200).send({
      page: Number(page),
      totalPages,
      totalPosts,
      posts,
      statusCode: 200,
      message: "All posts finded",
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const findOne = async (request, response) => {
  try {
    const { id } = request.params;
    const post = await postService.findOne(id);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: `Post with id ${id} not found`,
      });
    }
    response.status(200).send({
      statusCode: 200,
      post,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const findByCategory = async (request, response) => {
  try {
    const { q } = request.query;
    const post = await postService.findByCategory(q);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: `Post with name ${q} not found`,
      });
    }

    response.status(200).send({
      message: "Post finded",
      post,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createPost = async (request, response) => {
  try {
    const { body } = request;
    const post = await postService.createPosts(body);

    response.status(201).send({
      statusCode: 201,
      message: "Post created",
      post,
    });
  } catch (error) {
    console.error("Error while creating post:", error);
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updatePost = async (request, response) => {
  try {
    const { id } = request.params;
    const { body } = request;
    const post = await postService.updatePost(body, id);
    if (!post) {
      response.status(404).send({
        message: "Post not found",
        statusCode: 404,
      });
    }
    response.status(200).send({
      message: "Post edited successfully",
      statusCode: 200,
      post,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const uploadFileOnDisk = async (request, response, next) => {
  try {
    const url = `${request.protocol}://${request.get("host")}`;
    const imgUrl = request.file.filename;

    response.status(200).json({
      img: `${url}/uploads/${imgUrl}`,
    });
  } catch (error) {
    next(error);
  }
};

const uploadFileOnCloudinary = async (request, response, next) => {
  try {
    if (!request.file) {
      return response.status(400).json({
        statusCode: 400,
        message:
          "Nessun file ricevuto. Assicurati che il campo si chiami 'img'.",
      });
    }

    response.status(200).json({
      statusCode: 200,
      img: request.file.path,
      fileinfo: request.file,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (request, response, next) => {
  try {
    const { id } = request.params;
    const post = await postService.deletePost(id);
    if (!post) {
      throw new InvalidUserIdException();
    }
    response.status(200).send({
      message: "Post delete successfully",
      statusCode: 200,
      post,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  findByCategory,
  createPost,
  updatePost,
  uploadFileOnDisk,
  uploadFileOnCloudinary,
  deletePost,
};
