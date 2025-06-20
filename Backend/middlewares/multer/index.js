const { request, response } = require("express");
require("dotenv").config();

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const internalStorage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "uploads");
  },
  filename: (request, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  },
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "EPICODE",
    format: async (request, file) => "jpg",
    public_id: (request, file) => file.originalname,
  },
});

const upload = multer({ storage: internalStorage });
const cloudUpload = multer({ storage: cloudStorage });

module.exports = {
  upload,
  cloudUpload,
  cloudinary,
};
