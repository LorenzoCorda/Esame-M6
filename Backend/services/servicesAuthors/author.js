const AuthorSchema = require("../../models/author");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailAlreadyUsedException = require("../../exception/auth/emailAlreadyUsedException");
const EmailServices = require("../servicesEmail/email");
const emailService = new EmailServices();

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
  const existingAuthor = await AuthorSchema.findOne({ email: body.email });

  if (existingAuthor) {
    throw new EmailAlreadyUsedException();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const newAuthor = new AuthorSchema({
    ...body,
    password: hashedPassword,
  });

  const authorToSave = await newAuthor.save();

  emailService
    .send(
      authorToSave.email,
      "Epiblog - Welcome!",
      `<p>Ciao ${authorToSave.name},<br/>Grazie per esserti registrato su Epiblog! 🎉</p>`
    )
    .catch((err) => console.error("Error sending email:", err));

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
