const authorService = require("../../services/servicesAuthors/author");

const findAll = async (request, response) => {
  try {
    const { page = 1, pageSize = 10 } = request.query;
    const { totalAuthors, totalPages, authors } = await authorService.findAll(
      page,
      pageSize
    );
    if (!authors || authors.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "Authors not found",
      });
    }
    response.status(200).send({
      page: Number(page),
      totalPages,
      totalAuthors,
      authors,
      statusCode: 200,
      message: "All authors finded",
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
    const { authorId } = request.params;
    const author = await authorService.findOne(authorId);

    if (!author) {
      return response.status(404).send({
        statusCode: 404,
        message: `User with id ${authorId} not found`,
      });
    }
    response.status(200).send({
      statusCode: 200,
      author,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const findByName = async (request, response) => {
  try {
    const { q } = request.query;
    const author = await authorService.findByName(q);

    if (!author) {
      return response.status(404).send({
        statusCode: 404,
        message: `Author with name ${q} not found`,
      });
    }

    response.status(200).send({
      message: "Author finded",
      author,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createAuthor = async (request, response) => {
  try {
    const { body } = request;
    const author = await authorService.createAuthor(body);
    response.status(201).send({
      statusCode: 201,
      message: "Author created",
      author,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateAuthor = async (request, response) => {
  try {
    const { id } = request.params;
    const { body } = request;
    const author = await authorService.updateAuthor(body, id);
    if (!author) {
      response.status(404).send({
        message: "Author not found",
        statusCode: 404,
      });
    }
    response.status(200).send({
      message: "Author edited successfully",
      statusCode: 200,
      author,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const deleteAuthor = async (request, response) => {
  try {
    const { id } = request.params;
    const author = await authorService.deleteAuthor(id);
    if (!author) {
      response.status(404).send({
        message: "Author not found",
        statusCode: 404,
      });
    }
    response.status(200).send({
      message: "Author deleted",
      statusCode: 200,
      author,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  findAll,
  findOne,
  findByName,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
