const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 20,
      min: 2,
    },
    surName: {
      type: String,
      required: true,
      max: 100,
      min: 2,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    /*  avatar: {
      type: String,
      required: true,
    }, */
    role: {
      type: String,
      enum: ["user", "admin"],
    },
  },
  { timestamps: true, strict: true }
);

/* AuthorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (error) {
    next(error);
  }
}); */
AuthorSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(update.password, salt);

    this.setUpdate({
      ...update,
      password: hashedPassword,
    });
  }

  next();
});

module.exports = mongoose.model("author", AuthorSchema, "authors");
