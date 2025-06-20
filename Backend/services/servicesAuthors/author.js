const AuthorSchema = require("../../models/author");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserNotFoundException = require("../../exception/author/authorNotFoundException");
/* const InvalidPasswordException = require("../../exception/author/invalidPasswordException"); */

/* const signUp = async ({ firstName, lastName, email, dob, password }) => {
  const existingUser = await AuthorSchema.findOne({ email });
  if (existingUser) {
    throw new UserNotFoundException(); // Crea questa classe se non l'hai
  }

  const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

  const newUser = new AuthorSchema({
    firstName,
    lastName,
    email,
    dob,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign(
    {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );

  return {
    token,
  };
}; */

const findAll = async (page, pageSize) => {
  const authors = await AuthorSchema.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .sort({ createdAt: -1 });

  const totalAuthors = await AuthorSchema.countDocuments();
  const totalPages = Math.ceil(totalAuthors / pageSize);
  return {
    page,
    pageSize,
    totalAuthors,
    totalPages,
    authors,
  };
};

const findOne = async (authorId) => {
  return await AuthorSchema.findById(authorId);
};

const findByName = async (name) => {
  return AuthorSchema.find({
    name: {
      $regex: name,
      $options: "i",
    },
  });
};

const createAuthor = async (body) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  const newAuthor = new AuthorSchema({
    ...body,
    password: hashedPassword,
  });
  const authorToSave = await newAuthor.save();

  const token = jwt.sign(
    {
      id: authorToSave._id,
      email: authorToSave.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  return {
    message: "Author saved successfully",
    authorToSave,
    token,
  };
};

/* const createAuthor = async (body) => {
  const newAuthor = new AuthorSchema(body);
  const authorToSave = await newAuthor.save();
  return {
    message: "Author saved successfully",
    author: authorToSave,
  };
}; */

const updateAuthor = async (authorPayload, id) => {
  const options = { new: true };
  return AuthorSchema.findByIdAndUpdate(id, authorPayload, options);
};

const deleteAuthor = async (id) => {
  return AuthorSchema.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  findOne,
  findByName,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
