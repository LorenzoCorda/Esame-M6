require("dotenv").config();
const cors = require("cors");
const express = require("express");
/* const loggerMiddleware = require("./middlewares/logger"); */
const PORT = 9099;
const startServer = require("./config/db");

const authorRoute = require("./routes/routesAuthors/authors");
const postRoute = require("./routes/routesPosts/post");
const authRoute = require("./routes/routesAuth/auth");
const errorHandler = require("./middlewares/errorHandler");
/* const verifiedToken = require("./middlewares/verifiedToken"); */
/* const path = require("path"); */

const app = express();

app.use(
  cors({
    origin: [
      "esame-m6-lorenzos-projects-cd0213e7.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(express.json());

/* app.use(verifiedToken); */

/* app.use("/uploads", express.static(path.join(__dirname, "./uploads"))); */
/* app.use(loggerMiddleware); */
app.use("/authors", authorRoute);
app.use("/posts", postRoute);
app.use("/auth", authRoute);

app.use(errorHandler);

startServer(PORT, app);
